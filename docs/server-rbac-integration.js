/**
 * server-rbac-integration.js
 * نسخة معدلة من server.js توضح كيفية دمج RBAC
 * 
 * انسخ الأجزاء ذات الصلة إلى server.js الأساسي
 */

// ============= IMPORTS =============

// الموجود بالفعل
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// جديد - RBAC
const { Role } = require('./models/rbac.models');
const { seedRoles } = require('./seeds/rbac.seed');
const {
  PermissionChecker,
  authenticateToken,
  checkAccountStatus,
  checkPermission,
  requireHierarchyLevel,
  auditLog,
  checkDataOwnership,
  rbacErrorHandler
} = require('./middleware/rbac.middleware');

dotenv.config();

// ============= CONFIGURATION =============

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5500';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-system';

const app = express();

// ============= MIDDLEWARE SETUP =============

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Rate limiters
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

// ============= MONGODB CONNECTION =============

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✓ MongoDB متصل');
  
  // ← جديد: Seed RBAC roles
  await seedRBACRoles();
})
.catch(err => {
  console.error('✗ خطأ الاتصال بـ MongoDB:', err);
});

// ============= SCHEMAS =============

// الموجود بالفعل (بدون تغيير)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date,
  
  // ← جديد: RBAC fields
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
    index: true
  },
  metadata: {
    department: String,
    managerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: String,
    phoneNumber: String
  },
  suspensionInfo: {
    suspendedAt: Date,
    suspendedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    suspendedUntil: Date
  },
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttemptAt: Date,
    lockedUntil: Date
  }
});

// Indices جديدة
userSchema.index({ companyId: 1, username: 1 });
userSchema.index({ status: 1 });
userSchema.index({ roleId: 1 });

// الموجود بالفعل
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  taxNumber: String,
  note: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const accountSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID() },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },
  is_synced: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// جديد: محدث AuditLog
const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  action: {
    type: String,
    enum: ['LOGIN', 'LOGOUT', 'CREATE', 'READ', 'UPDATE', 'DELETE', 'ROLE_CHANGE', 'SUSPEND_USER'],
    index: true
  },
  resource: { 
    type: String,
    enum: ['User', 'Transaction', 'Inventory', 'Account'],
    index: true
  },
  resourceId: { type: mongoose.Schema.Types.ObjectId, index: true },
  changes: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed
  },
  requestInfo: {
    ipAddress: String,
    userAgent: String,
    method: String,
    endpoint: String
  },
  status: { type: String, enum: ['success', 'failed'], default: 'success', index: true },
  errorMessage: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },
  createdAt: { type: Date, default: Date.now, index: true, expires: 7776000 }
});

// Models
const User = mongoose.model('User', userSchema);
const Company = mongoose.model('Company', companySchema);
const Account = mongoose.model('Account', accountSchema);
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// ============= HELPER FUNCTIONS =============

// الموجود بالفعل
function sanitizeAccountRecord(record, userId) {
  const incoming = record || {};
  const id = typeof incoming.id === 'string' && incoming.id.trim() ? incoming.id.trim() : crypto.randomUUID();
  const name = typeof incoming.name === 'string' && incoming.name.trim() ? incoming.name.trim() : 'Unnamed Account';
  const balance = typeof incoming.balance === 'number' ? incoming.balance : Number(incoming.balance) || 0;

  return {
    id,
    name,
    balance,
    user_id: userId,
    is_synced: true,
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
}

// محدث - logAudit
async function logAudit(userId, action, resource, resourceId, changes, req) {
  try {
    const user = req.user || {};
    await AuditLog.create({
      userId,
      action,
      resource,
      resourceId,
      changes,
      requestInfo: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        method: req.method,
        endpoint: req.originalUrl
      },
      companyId: user.companyId,
      status: 'success'
    });
  } catch (error) {
    console.error('خطأ في تسجيل التدقيق:', error);
  }
}

// ← جديد: دالة Seed الأدوار
async function seedRBACRoles() {
  try {
    const existingRoles = await Role.countDocuments();
    if (existingRoles === 0) {
      await Role.insertMany(seedRoles);
      console.log('✓ تم إنشاء 5 أدوار افتراضية');
    }
  } catch (error) {
    console.error('خطأ في إنشاء الأدوار:', error);
  }
}

// ← محدث: createJwtForUser مع الصلاحيات
async function createJwtForUser(user) {
  try {
    // جلب دور المستخدم
    const role = user.roleId ? 
      await Role.findById(user.roleId) :
      await Role.findOne({ name: 'Employee' }); // default role
    
    if (!role) {
      throw new Error('الدور غير موجود');
    }

    return jwt.sign({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // للتوافق مع القديم
      roleHierarchy: role.hierarchy,
      permissions: role.permissions,
      metadata: user.metadata,
      status: user.status,
      companyId: user.companyId
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    console.error('خطأ في إنشاء JWT:', error);
    throw error;
  }
}

// ============= MIDDLEWARE (OLD) =============

// يمكن حذف هذه الـ functions لأنها موجودة في rbac.middleware.js
// لكن نتركها للتوافق مع الكود القديم

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'ممنوع: مطلوب صلاحيات الإدارة'
    });
  }
  next();
}

function requireManagerOrAdmin(req, res, next) {
  if (!['admin', 'manager'].includes(req.user?.role)) {
    return res.status(403).json({
      status: 'error',
      message: 'ممنوع: مطلوب صلاحيات'
    });
  }
  next();
}

// ============= API ENDPOINTS =============

// تحديث: Login مع Brute Force Protection و RBAC
app.post('/api/v1/auth/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'اسم المستخدم وكلمة المرور مطلوبان.'
      });
    }

    const user = await User.findOne({ username });
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'بيانات دخول غير صحيحة.'
      });
    }

    // ← جديد: فحص الحسابات المقفولة
    if (user.loginAttempts?.lockedUntil && user.loginAttempts.lockedUntil > new Date()) {
      return res.status(429).json({
        status: 'error',
        message: 'الحساب مقفول مؤقتاً. حاول لاحقاً.'
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      // ← جديد: تسجيل محاولة فاشلة
      user.loginAttempts = user.loginAttempts || { count: 0 };
      user.loginAttempts.count += 1;
      user.loginAttempts.lastAttemptAt = new Date();
      
      if (user.loginAttempts.count >= 5) {
        user.loginAttempts.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      
      await user.save();
      return res.status(401).json({
        status: 'error',
        message: 'بيانات دخول غير صحيحة.'
      });
    }

    // ← جديد: تسجيل دخول ناجح
    user.lastLogin = new Date();
    user.loginAttempts = { count: 0 };
    user.status = 'active';
    await user.save();

    const token = await createJwtForUser(user);
    
    await logAudit(user._id, 'LOGIN', 'User', user._id.toString(), null, req);

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        companyId: user.companyId
      }
    });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({
      status: 'error',
      message: 'خطأ في الخادم'
    });
  }
});

// ← جديد: Create User (مع RBAC)
app.post('/api/v1/auth/create-user', 
  authenticateToken,
  checkPermission('users', 'create'),
  async (req, res) => {
    try {
      const { username, password, name, email, roleId, companyId } = req.body;
      
      if (!username || !password || !name) {
        return res.status(400).json({
          status: 'error',
          message: 'الحقول المطلوبة مفقودة.'
        });
      }

      // التحقق من وجود الدور
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).json({
          status: 'error',
          message: 'الدور غير موجود'
        });
      }

      const userCompanyId = companyId || req.user.companyId;

      const newUser = new User({
        username: username.toLowerCase(),
        passwordHash: await bcrypt.hash(password, 10),
        name,
        email: email?.toLowerCase(),
        roleId,
        role: role.name.toLowerCase(),
        companyId: userCompanyId,
        status: 'active',
        createdBy: req.user.userId
      });

      await newUser.save();
      
      await logAudit(req.user.userId, 'CREATE', 'User', newUser._id.toString(), { user: newUser }, req);

      res.status(201).json({
        status: 'success',
        message: 'تم إنشاء المستخدم بنجاح',
        user: {
          id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error('خطأ في إنشاء مستخدم:', error);
      res.status(500).json({
        status: 'error',
        message: error.message || 'خطأ في الخادم'
      });
    }
  }
);

// ← جديد: Get All Users
app.get('/api/v1/users',
  authenticateToken,
  checkPermission('users', 'read'),
  async (req, res) => {
    try {
      const users = await User.find({ companyId: req.user.companyId })
        .populate('roleId', 'name description hierarchy')
        .select('-passwordHash')
        .lean();

      res.json({
        status: 'success',
        data: users
      });
    } catch (error) {
      console.error('خطأ في جلب المستخدمين:', error);
      res.status(500).json({
        status: 'error',
        message: 'خطأ في الخادم'
      });
    }
  }
);

// ← جديد: Update User Role
app.patch('/api/v1/users/:id/role',
  authenticateToken,
  checkPermission('users', 'update'),
  auditLog('ROLE_CHANGE', 'User'),
  async (req, res) => {
    try {
      const { roleId } = req.body;

      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({
          status: 'error',
          message: 'الدور غير موجود'
        });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'المستخدم غير موجود'
        });
      }

      const oldRole = user.roleId;
      user.roleId = roleId;
      user.role = role.name.toLowerCase();
      user.updatedBy = req.user.userId;

      await user.save();

      await logAudit(
        req.user.userId,
        'ROLE_CHANGE',
        'User',
        user._id.toString(),
        { before: { roleId: oldRole }, after: { roleId } },
        req
      );

      res.json({
        status: 'success',
        message: 'تم تحديث الدور بنجاح',
        data: user
      });
    } catch (error) {
      console.error('خطأ في تحديث الدور:', error);
      res.status(500).json({
        status: 'error',
        message: 'خطأ في الخادم'
      });
    }
  }
);

// ← جديد: Suspend/Activate User
app.patch('/api/v1/users/:id/status',
  authenticateToken,
  requireHierarchyLevel(2),
  async (req, res) => {
    try {
      const { status, reason } = req.body;

      if (!['active', 'inactive', 'suspended'].includes(status)) {
        return res.status(400).json({
          status: 'error',
          message: 'حالة غير صحيحة'
        });
      }

      const user = await User.findById(req.params.id);
      const oldStatus = user.status;

      user.status = status;
      if (status === 'suspended') {
        user.suspensionInfo = {
          suspendedAt: new Date(),
          suspendedBy: req.user.userId,
          reason: reason || 'تعليق من قبل المسؤول'
        };
      } else {
        user.suspensionInfo = null;
      }

      await user.save();

      await logAudit(
        req.user.userId,
        status === 'suspended' ? 'SUSPEND_USER' : 'UPDATE',
        'User',
        user._id.toString(),
        { before: { status: oldStatus }, after: { status } },
        req
      );

      res.json({
        status: 'success',
        message: `تم ${status === 'active' ? 'تفعيل' : 'تعليق'} المستخدم`,
        data: user
      });
    } catch (error) {
      console.error('خطأ في تحديث حالة المستخدم:', error);
      res.status(500).json({
        status: 'error',
        message: 'خطأ في الخادم'
      });
    }
  }
);

// ← جديد: Get Audit Log
app.get('/api/v1/audit-log',
  authenticateToken,
  checkPermission('audit', 'read'),
  async (req, res) => {
    try {
      const { page = 1, limit = 50, userId, action } = req.query;
      const skip = (page - 1) * limit;

      const filter = { companyId: req.user.companyId };
      if (userId) filter.userId = userId;
      if (action) filter.action = action;

      const auditLogs = await AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('userId', 'username name')
        .lean();

      const total = await AuditLog.countDocuments(filter);

      res.json({
        status: 'success',
        data: auditLogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('خطأ في جلب سجل التدقيق:', error);
      res.status(500).json({
        status: 'error',
        message: 'خطأ في الخادم'
      });
    }
  }
);

// ============= ERROR HANDLING =============

app.use(rbacErrorHandler);

app.use((err, req, res, next) => {
  console.error('خطأ غير متوقع:', err);
  res.status(500).json({
    status: 'error',
    message: 'خطأ في الخادم'
  });
});

// ============= START SERVER =============

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});

module.exports = app;
