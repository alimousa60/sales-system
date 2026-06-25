const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const http = require('http');
const WebSocket = require('ws');
let MongoMemoryServer = null;
try { MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer; } catch(e) {}
const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { authenticateToken, checkAccountStatus, requireAdmin, requireSystemAdmin } = require('./middleware/auth.middleware');
const { sanitizeBody } = require('./middleware/validation');
const { setupSwagger } = require('./config/swagger');

// Models (only for index creation)
const User = require('./models/user.model');
const Company = require('./models/company.model');
const Role = require('./models/rbac.models').Role;
const RBACauditLog = require('./models/rbacAuditLog.model');
const Transaction = require('./models/transaction.model');

// Controllers
const AuthController = require('./controllers/auth.controller');
const CompanyController = require('./controllers/company.controller');

mongoose.set('autoIndex', false);

// ========== RBAC IMPORTS ==========
let seedRBACRoles;
try {
  const rbacSeed = require('./seeds/rbac.seed');
  seedRBACRoles = rbacSeed.seedRBACRoles;
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
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:5500').split(',').map(s => s.trim());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net/npm/chart.js", "https://cdn.sheetjs.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));
app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: function(origin, cb) {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) return cb(null, true);
    cb(new Error('CORS مرفوض'));
  },
  credentials: true
}));

// Global input sanitization
app.use(sanitizeBody());

// Swagger API Documentation (no auth required)
setupSwagger(app);

// Serve ONLY public frontend files (block server internals)
const allowedStaticExts = ['.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
const blockedPaths = ['/models/', '/routes/', '/middleware/', '/seeds/', '/utils/', '/logs/', '/.env', '/server.js', '/jest.config.js', '/package.json', '/render.yaml', '/AGENTS.md', '/jest.setup.js'];
app.use((req, res, next) => {
  for (const bp of blockedPaths) {
    if (req.url === bp || req.url.startsWith(bp)) {
      return res.status(403).json({ status: 'error', message: 'ممنوع' });
    }
  }
  next();
});
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.url.startsWith('/api/')) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.removeHeader('X-Powered-By');
  }
  next();
});
app.use(express.static(path.join(__dirname), {
  index: 'sales-system.html',
  extensions: ['html']
}));

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 50 : 5,
  message: 'عدد محاولات الدخول كثير جداً. حاول لاحقاً.'
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/v1/auth/login', loginLimiter);
app.use('/api/v1/', apiLimiter);

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
    const httpServer = http.createServer(app);
    const wss = new WebSocket.Server({ server: httpServer });

    wss.on('connection', (ws, req) => {
      ws.isAlive = true;
      ws.on('pong', () => { ws.isAlive = true; });
      // Log connection for audit
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      logger.info(`WebSocket اتصال جديد من ${ip}`);
    });

    setInterval(() => {
      wss.clients.forEach(ws => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    global.broadcastWS = (data) => {
      const msg = JSON.stringify(data);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) client.send(msg);
      });
    };

    httpServer.listen(port, () => {
      logger.info(`نظام المبيعات يعمل على http://localhost:${port}`);
      logger.info(`CORS origin: ${CORS_ORIGIN}`);
      logger.info(`WebSocket متصل على ws://localhost:${port}`);
    });

    httpServer.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        const nextPort = Number(port) + 1;
        logger.warn(`المنفذ ${port} مشغول، جاري المحاولة على المنفذ ${nextPort}...`);
        httpServer.close(() => startServer(nextPort));
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
  const AuthService = require('./services/auth.service');
  await AuthService.logAudit(userId, action, resource, resourceId, changes, req);
}

// ========== Middleware Guards ==========
const authGuard = authenticateToken;
const activeAccountGuard = checkAccountStatus;

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
app.use('/api/v1/auth/login', sanitizeBody(), authRoutes);
app.post('/api/v1/auth/logout', authGuard, AuthController.logout);
app.get('/api/v1/auth/profile', authGuard, activeAccountGuard, AuthController.profile);
app.post('/api/v1/auth/create-user', authGuard, activeAccountGuard, requireSystemAdmin, AuthController.createUser);

app.use('/api/v1/accounts', authGuard, activeAccountGuard, accountRoutes);
app.use('/api/v1/sync', authGuard, activeAccountGuard, syncRoutes);
app.use('/api/v1/transactions', authGuard, activeAccountGuard, transactionRoutes);
app.use('/api/v1/admin', authGuard, activeAccountGuard, requireAdmin, adminRoutes);
app.use('/api/v1/users', authGuard, activeAccountGuard, usersRoutes);
app.use('/api/v1/backups', authGuard, activeAccountGuard, backupRoutes);
app.use('/api/hrm', authGuard, activeAccountGuard, hrmRoutes);

// Company routes
app.get('/api/v1/company', authGuard, activeAccountGuard, CompanyController.getCompany);
app.patch('/api/v1/company', authGuard, activeAccountGuard, requireAdmin, CompanyController.updateCompany);

// Broadcast data change to all connected WebSocket clients (admin only)
app.post('/api/v1/sync/broadcast', authGuard, requireAdmin, (req, res) => {
  try {
    const { type, section, data } = req.body;
    if (global.broadcastWS) {
      global.broadcastWS({ type: type || 'data-change', section: section || 'unknown', data, userId: req.user.userId, ts: Date.now() });
    }
    res.json({ status: 'success' });
  } catch (e) {
    res.status(500).json({ status: 'error' });
  }
});

// Serve main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'sales-system.html'));
});

// Error handler (must be last)
app.use(errorHandler);

// حالة النظام (auth required)
app.get('/api/v1/status', authGuard, (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    rbac: seedRBACRoles ? 'enabled' : 'disabled'
  });
});

