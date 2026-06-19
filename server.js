const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { MongoMemoryServer } = require('mongodb-memory-server');
const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const companyRoutes = require('./routes/company.routes');

// Models
const User = require('./models/user.model');
const Company = require('./models/company.model');
const Account = require('./models/account.model');
const Transaction = require('./models/transaction.model');
const AuditLog = require('./models/auditLog.model');
const Role = require('./models/rbac.models').Role;
const RBACauditLog = require('./models/rbacAuditLog.model');

mongoose.set('autoIndex', false);

// ========== RBAC IMPORTS ==========
let seedRBACRoles, authenticateTokenRBAC, checkAccountStatus, checkPermissionRBAC;
try {
  const rbacSeed = require('./seeds/rbac.seed');
  seedRBACRoles = rbacSeed.seedRBACRoles;
  
  const rbacMiddleware = require('./middleware/rbac.middleware');
  authenticateTokenRBAC = rbacMiddleware.authenticateToken;
  checkAccountStatus = rbacMiddleware.checkAccountStatus;
  checkPermissionRBAC = rbacMiddleware.checkPermission;
} catch (err) {
  logger.warn('RBAC files not found. RBAC features will be disabled.');
}

const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  logger.error('JWT_SECRET must be defined in .env');
  process.exit(1);
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5500';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-system';

const app = express();

// Security middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: function(o, cb) { cb(null, true); }, credentials: true }));

// Serve static frontend files
const path = require('path');
app.use(express.static(path.join(__dirname)));

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'عدد محاولات الدخول كثير جداً. حاول لاحقاً.'
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/v1/auth/login', loginLimiter);
app.use('/api/v1/', apiLimiter);
app.use('/api/v1/companies', companyRoutes);

// MongoDB Connection
async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info('MongoDB متصل');
  } catch (initialError) {
    const canUseFallback = process.env.NODE_ENV !== 'production' && process.env.USE_MEMORY_DB !== 'false';

    if (canUseFallback) {
      try {
        logger.warn('فشل الاتصال بـ MongoDB الخارجي، جاري تشغيل نسخة محلية مؤقتة...');
        const memoryServer = await MongoMemoryServer.create();
        const memoryUri = memoryServer.getUri();
        await mongoose.connect(memoryUri, {
          serverSelectionTimeoutMS: 10000,
        });
        logger.info('MongoDB المحلي المؤقت متصل');
        global.__MEMORY_DB__ = memoryServer;
      } catch (memoryError) {
        logger.error('فشل الاتصال بـ MongoDB الخارجي والنسخة المحلية المؤقتة: ' + memoryError.message);
        throw initialError;
      }
      return;
    }

    logger.error('فشل الاتصال بـ MongoDB. راجع .env لتحديث MONGODB_URI: ' + initialError.message);
    throw initialError;
  }
}

connectDatabase()
.then(async () => {
  // ========== RBAC INITIALIZATION ==========
  if (seedRBACRoles) {
    try {
      await seedRBACRoles();
      logger.info('RBAC Roles تمت تهيئتها');
    } catch (err) {
      logger.error('خطأ في تهيئة RBAC: ' + err.message);
    }
  }

  try {
    await ensureIndexes();
  } catch (err) {
    logger.error('خطأ في تهيئة الفهارس: ' + err.message);
    process.exit(1);
  }

  // Auto-create default admin if no users exist (first run or empty DB)
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const bcrypt2 = require('bcryptjs');
      const hash = await bcrypt2.hash('1234', 10);
      const defCompany = await Company.create({ name: 'الشركة الافتراضية', code: 'DEFAULT', status: 'active', owner: new mongoose.Types.ObjectId() });
      await User.create({ username: 'admin', passwordHash: hash, name: 'المدير', role: 'system_admin', companyId: defCompany._id, status: 'active', isActive: true });
      logger.info('تم إنشاء حساب افتراضي: admin / 1234');
    }
  } catch (seedErr) {
    logger.warn('تنبيه إنشاء حساب افتراضي: ' + seedErr.message);
  }

  const startServer = (port) => {
    const server = app.listen(port, () => {
      logger.info(`نظام المبيعات يعمل على http://localhost:${port}`);
      logger.info(`CORS origin: ${CORS_ORIGIN}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        const nextPort = Number(port) + 1;
        logger.warn(`المنفذ ${port} مشغول، جاري المحاولة على المنفذ ${nextPort}...`);
        server.close(() => startServer(nextPort));
      } else {
        logger.error('خطأ في بدء الخادم: ' + error.message);
        process.exit(1);
      }
    });
  };

  startServer(PORT);
})
.catch(err => {
  logger.error('خطأ في تهيئة قاعدة البيانات: ' + err.message);
  process.exit(1);
});

const authGuard = authenticateTokenRBAC || authenticateToken;
const activeAccountGuard = checkAccountStatus || ((req, res, next) => next());

// Models are now imported from models/ directory (self-registering with mongoose).

// ========== MONGODB INDEXES ==========
async function ensureIndexes() {
  try {
    await Promise.all([
      User.collection.createIndex({ username: 1 }, { unique: true }),
      User.collection.createIndex({ email: 1 }, { unique: true, sparse: true }),
      User.collection.createIndex({ roleId: 1 }),
      User.collection.createIndex({ companyId: 1, status: 1 }),
      User.collection.createIndex({ 'loginAttempts.lockedUntil': 1 }),
      Role.collection.createIndex({ name: 1 }, { unique: true }),
      RBACauditLog.collection.createIndex({ userId: 1, createdAt: -1 }),
      RBACauditLog.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 }),
      Transaction.collection.createIndex({ companyId: 1, createdAt: -1 }),
      Transaction.collection.createIndex({ userId: 1, status: 1 }),
      Transaction.collection.createIndex({ type: 1, direction: 1 }),
      Transaction.collection.createIndex({ accountId: 1, referenceId: 1 })
    ]);
    logger.info('الفهارس تم إنشاؤها');
  } catch (err) {
    logger.error('خطأ في إنشاء الفهارس: ' + err.message);
    throw err;
  }
}

// ========== Helper Functions ==========

async function logAudit(userId, action, resource, resourceId, changes, req) {
  try {
    await AuditLog.create({
      userId,
      action,
      resource,
      resourceId,
      changes,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
  } catch (error) {
    logger.error('خطأ في تسجيل التدقيق: ' + error.message);
  }
}

// ========== Middleware ==========

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'غير مصرح: البطاقة المرور مفقودة' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const message = err.name === 'TokenExpiredError'
        ? 'انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.'
        : 'بطاقة مرور غير صحيحة.';
      return res.status(401).json({ status: 'error', message });
    }

    req.user = {
      userId: payload.userId,
      role: payload.role,
      username: payload.username,
      companyId: payload.companyId
    };

    next();
  });
}

function requireAdmin(req, res, next) {
  if (!['admin', 'system_admin'].includes(req.user?.role)) {
    return res.status(403).json({ status: 'error', message: 'ممنوع: مطلوب صلاحيات الإدارة' });
  }
  next();
}

function requireSystemAdmin(req, res, next) {
  if (req.user?.role !== 'system_admin') {
    return res.status(403).json({
      status: 'error',
      message: 'ممنوع: مطلوب صلاحيات مدير النظام'
    });
  }
  next();
}

// ========== Route Imports ==========
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');
const adminRoutes = require('./routes/admin.routes');
const syncRoutes = require('./routes/sync.routes');
const usersRoutes = require('./routes/users.routes');
const backupRoutes = require('./routes/backup.routes');
const hrmRoutes = require('./routes/hrm.routes');

// ========== Mount Routes ==========
app.use('/api/v1/auth/login', authRoutes);
app.post('/api/v1/auth/logout', authGuard, async (req, res) => {
  try {
    if (RBACauditLog) {
      await RBACauditLog.create({
        userId: req.user?.userId,
        action: 'LOGOUT',
        resource: 'User',
        status: 'success',
        ipAddress: req.ip
      });
    }
    res.json({ status: 'success', message: 'تم تسجيل الخروج بنجاح' });
  } catch (error) {
    logger.error('خطأ في تسجيل الخروج: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});
app.get('/api/v1/auth/profile', authGuard, activeAccountGuard, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash').populate('roleId', 'name description hierarchy permissions');
    if (!user) return res.status(404).json({ status: 'error', message: 'المستخدم غير موجود' });
    res.json({ status: 'success', data: user });
  } catch (error) {
    logger.error('خطأ في جلب ملف التعريف: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});
app.post('/api/v1/auth/create-user', authGuard, activeAccountGuard, requireSystemAdmin, async (req, res) => {
  try {
    const { username, password, name, email, role, companyId } = req.body;
    if (!username || !password || !name) return res.status(400).json({ status: 'error', message: 'الحقول المطلوبة مفقودة.' });
    const validRoles = ['system_admin', 'admin', 'manager', 'user', 'sales', 'inventory'];
    if (!validRoles.includes(role)) return res.status(400).json({ status: 'error', message: 'دور غير صحيح.' });
    if (!companyId) return res.status(400).json({ status: 'error', message: 'companyId مطلوب' });
    const targetCompany = await Company.findById(companyId);
    if (!targetCompany) return res.status(404).json({ status: 'error', message: 'الشركة غير موجودة' });
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ status: 'error', message: 'اسم المستخدم موجود بالفعل.' });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, name, email, role, companyId, createdBy: req.user.userId });
    await newUser.save();
    await logAudit(req.user.userId, 'CREATE_USER', 'User', newUser._id.toString(), { role, companyId }, req);
    res.status(201).json({ status: 'success', message: 'تم إنشاء المستخدم بنجاح', user: { id: newUser._id, username: newUser.username, name: newUser.name, role: newUser.role, email: newUser.email, companyId: newUser.companyId } });
  } catch (error) {
    logger.error('خطأ في إنشاء مستخدم: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

app.use('/api/v1/accounts', authGuard, activeAccountGuard, accountRoutes);
app.use('/api/v1/sync', authGuard, activeAccountGuard, syncRoutes);
app.use('/api/v1/transactions', authGuard, activeAccountGuard, transactionRoutes);
app.use('/api/v1/admin', authGuard, activeAccountGuard, requireAdmin, adminRoutes);
app.use('/api/v1/users', authGuard, usersRoutes);
app.use('/api/v1/backups', authGuard, activeAccountGuard, backupRoutes);
app.use('/api/hrm', authGuard, activeAccountGuard, hrmRoutes);

// معلومات الشركة الحالية
app.get('/api/v1/company', authGuard, activeAccountGuard, async (req, res) => {
  try {
    const company = await Company.findById(req.user.companyId);
    if (!company) return res.status(404).json({ status: 'error', message: 'الشركة غير موجودة' });
    res.json({ status: 'success', company });
  } catch (error) {
    logger.error('خطأ في جلب بيانات الشركة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

app.patch('/api/v1/company', authGuard, activeAccountGuard, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'logo', 'address', 'phone', 'email', 'taxNumber', 'note', 'industry', 'country', 'timezone', 'status'];
    const updates = {};
    allowedUpdates.forEach((field) => { if (field in req.body) updates[field] = req.body[field]; });
    if (Object.keys(updates).length === 0) return res.status(400).json({ status: 'error', message: 'لا توجد بيانات صالحة للتحديث' });
    const company = await Company.findById(req.user.companyId);
    if (!company) return res.status(404).json({ status: 'error', message: 'الشركة غير موجودة' });
    if (company.owner?.toString() !== req.user.userId && req.user.role !== 'admin') return res.status(403).json({ status: 'error', message: 'ممنوع: مطلوب صلاحيات تحديث الشركة' });
    updates.updatedAt = new Date();
    const updatedCompany = await Company.findByIdAndUpdate(req.user.companyId, updates, { new: true, runValidators: true });
    await logAudit(req.user.userId, 'UPDATE_COMPANY', 'Company', updatedCompany._id.toString(), updates, req);
    res.json({ status: 'success', company: updatedCompany });
  } catch (error) {
    logger.error('خطأ في تحديث بيانات الشركة: ' + error.message);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});

// Error handler (must be last)
app.use(errorHandler);

// حالة النظام
app.get('/api/v1/status', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    rbac: seedRBACRoles ? 'enabled' : 'disabled'
  });
});

