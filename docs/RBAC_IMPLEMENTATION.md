/**
 * RBAC Implementation Guide
 * دليل التطبيق الكامل لنظام RBAC
 * 
 * ملخص الخطوات:
 * 1. تحديث server.js بـ RBAC models و middleware
 * 2. تشغيل script لإنشاء الأدوار الافتراضية
 * 3. تحديث الـ JWT payload ليشمل permissions
 * 4. تطبيق RBAC على API endpoints
 */

// ============= STEP 1: إضافة RBAC Models إلى server.js =============

/*
في أعلى server.js، أضف:

const { Role } = require('./models/rbac.models');
const { seedRoles } = require('./seeds/rbac.seed');
const {
  authenticateToken,
  checkAccountStatus,
  checkPermission,
  requireHierarchyLevel,
  auditLog,
  checkDataOwnership,
  PermissionChecker
} = require('./middleware/rbac.middleware');

// بعد اتصال MongoDB مباشرة، أضف دالة seed للأدوار
async function seedRBACRoles() {
  try {
    const existingRoles = await Role.countDocuments();
    if (existingRoles === 0) {
      await Role.insertMany(seedRoles);
      console.log('✓ تم إنشاء الأدوار الافتراضية');
    }
  } catch (error) {
    console.error('خطأ في إنشاء الأدوار:', error);
  }
}

// استدعِ الدالة بعد اتصال MongoDB:
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✓ MongoDB متصل');
  seedRBACRoles(); // ← أضف هذا
}).catch(err => console.error('✗ خطأ الاتصال بـ MongoDB:', err));
*/

// ============= STEP 2: تحديث createJwtForUser =============

/*
استبدل الدالة الموجودة بهذه الدالة المحسّنة:

async function createJwtForUser(user) {
  try {
    // جلب دور المستخدم
    const role = await Role.findById(user.roleId);
    
    if (!role) {
      throw new Error('الدور غير موجود');
    }

    // إنشاء JWT مع الصلاحيات
    return jwt.sign({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // للتوافق مع القديم
      roleHierarchy: role.hierarchy,
      permissions: role.permissions, // ← أضف الصلاحيات هنا
      metadata: user.metadata,
      status: user.status,
      companyId: user.companyId
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    console.error('خطأ في إنشاء JWT:', error);
    throw error;
  }
}
*/

// ============= STEP 3: تحديث Login Endpoint =============

/*
عدّل endpoint /api/v1/auth/login ليتضمن:

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
    if (!user || !user.isActive || user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'بيانات دخول غير صحيحة.'
      });
    }

    // فحص المحاولات الفاشلة (Brute Force Protection)
    if (user.loginAttempts?.lockedUntil > new Date()) {
      return res.status(429).json({
        status: 'error',
        message: 'الحساب مقفول مؤقتاً. حاول لاحقاً.'
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      // تسجيل محاولة فاشلة
      user.loginAttempts = user.loginAttempts || {};
      user.loginAttempts.count = (user.loginAttempts.count || 0) + 1;
      user.loginAttempts.lastAttemptAt = new Date();
      
      // قفل الحساب بعد 5 محاولات فاشلة
      if (user.loginAttempts.count >= 5) {
        user.loginAttempts.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 دقيقة
      }
      
      await user.save();
      return res.status(401).json({
        status: 'error',
        message: 'بيانات دخول غير صحيحة.'
      });
    }

    // تسجيل دخول ناجح - إعادة تعيين محاولات فاشلة
    user.lastLogin = new Date();
    user.loginAttempts = { count: 0 };
    user.status = 'active';
    await user.save();

    const token = await createJwtForUser(user);
    
    // تسجيل الإجراء
    await logAudit(user._id, 'LOGIN', 'User', user._id.toString(), null, req);

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
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
*/

// ============= STEP 4: إضافة User Management Endpoints =============

/*
أضف هذه الـ endpoints بعد endpoints المصادقة الموجودة:

// جلب جميع المستخدمين (Admin فقط)
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

// جلب مستخدم واحد
app.get('/api/v1/users/:id',
  authenticateToken,
  checkPermission('users', 'read'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('roleId', 'name description hierarchy')
        .select('-passwordHash')
        .lean();

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'المستخدم غير موجود'
        });
      }

      // فحص ملكية البيانات
      if (user.companyId.toString() !== req.user.companyId.toString() &&
          req.user.roleHierarchy !== 1) {
        return res.status(403).json({
          status: 'error',
          message: 'ممنوع: ليست لديك صلاحية الوصول إلى هذا المستخدم'
        });
      }

      res.json({
        status: 'success',
        data: user
      });
    } catch (error) {
      console.error('خطأ في جلب المستخدم:', error);
      res.status(500).json({
        status: 'error',
        message: 'خطأ في الخادم'
      });
    }
  }
);

// تحديث دور المستخدم (Admin فقط)
app.patch('/api/v1/users/:id/role',
  authenticateToken,
  checkPermission('users', 'update'),
  auditLog('ROLE_CHANGE', 'User'),
  async (req, res) => {
    try {
      const { roleId } = req.body;

      // التحقق من وجود الدور
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({
          status: 'error',
          message: 'الدور غير موجود'
        });
      }

      // عدم السماح بتغيير دور SuperUser إلا من SuperUser
      const user = await User.findById(req.params.id);
      if (user.roleId.toString() === /* SuperUser Role ID */ 
          && req.user.roleHierarchy !== 1) {
        return res.status(403).json({
          status: 'error',
          message: 'ممنوع: لا يمكن تغيير دور المشرف الأعلى'
        });
      }

      const oldRole = user.roleId;
      user.roleId = roleId;
      user.role = role.name.toLowerCase(); // للتوافق مع القديم
      user.cachedPermissions = role.permissions;
      user.updatedBy = req.user.userId;
      user.updatedAt = new Date();

      await user.save();

      // تسجيل التغيير في audit trail
      if (!user.auditTrail) user.auditTrail = [];
      user.auditTrail.push({
        action: 'ROLE_CHANGE',
        timestamp: new Date(),
        changedBy: req.user.userId,
        changes: {
          before: { roleId: oldRole },
          after: { roleId: roleId }
        }
      });

      await logAudit(
        req.user.userId,
        'ROLE_CHANGE',
        'User',
        user._id.toString(),
        { before: { roleId: oldRole }, after: { roleId: roleId } },
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

// تعليق/تفعيل المستخدم (Admin فقط)
app.patch('/api/v1/users/:id/status',
  authenticateToken,
  requireHierarchyLevel(2), // Admin وما فوق
  auditLog('SUSPEND_USER', 'User'),
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
          reason: reason || 'تعليق من قبل المسؤول',
          suspendedUntil: null // معلق إلى إشعار آخر
        };
      } else {
        user.suspensionInfo = null;
      }
      user.updatedBy = req.user.userId;

      await user.save();

      await logAudit(
        req.user.userId,
        status === 'suspended' ? 'SUSPEND_USER' : 'ACTIVATE_USER',
        'User',
        user._id.toString(),
        { before: { status: oldStatus }, after: { status } },
        req
      );

      res.json({
        status: 'success',
        message: `تم ${status === 'active' ? 'تفعيل' : 'تعليق'} المستخدم بنجاح`,
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

// جلب سجل التدقيق
app.get('/api/v1/audit-log',
  authenticateToken,
  checkPermission('audit', 'read'),
  async (req, res) => {
    try {
      const { page = 1, limit = 50, userId, action, resource } = req.query;
      const skip = (page - 1) * limit;

      const filter = { companyId: req.user.companyId };
      if (userId) filter.userId = userId;
      if (action) filter.action = action;
      if (resource) filter.resource = resource;

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
*/

// ============= STEP 5: استخدام RBAC في الـ Existing Endpoints =============

/*
مثال: تحديث endpoint الفواتير ليستخدم RBAC

// قبل:
app.post('/api/v1/invoices',
  authenticateToken,
  requireManagerOrAdmin,
  createInvoiceHandler
);

// بعد (مع RBAC):
app.post('/api/v1/invoices',
  authenticateToken,
  checkAccountStatus,
  checkPermission('transactions', 'create'),
  checkDataOwnership,
  auditLog('CREATE', 'Transaction'),
  createInvoiceHandler
);
*/

// ============= MONGODB INDICES للأداء الأفضل =============

/*
أضف هذه الـ indices بعد تعريف الـ schemas:

// User Schema indices
userSchema.index({ companyId: 1, username: 1 });
userSchema.index({ status: 1 });
userSchema.index({ roleId: 1 });
userSchema.index({ createdAt: -1 });

// Role Schema indices (موجود بالفعل في rbac.models.js)

// AuditLog indices
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ companyId: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, action: 1 });
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // TTL index
*/

// ============= اختبار RBAC في Postman أو CLI =============

/*
1. تسجيل الدخول:
POST /api/v1/auth/login
{
  "username": "admin",
  "password": "password"
}

الاستجابة:
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}

2. استخدام التوكن:
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

3. تغيير دور المستخدم:
PATCH /api/v1/users/USER_ID/role
Authorization: Bearer TOKEN
{
  "roleId": "ROLE_ID"
}

4. جلب سجل التدقيق:
GET /api/v1/audit-log?page=1&limit=50&action=LOGIN
Authorization: Bearer TOKEN
*/

module.exports = {
  seedRBACRoles: null, // يتم تنفيذه في server.js
  roleGuards: {
    createJwtForUser: 'دالة محدثة في server.js',
    loginEndpoint: 'محدث مع Brute Force protection',
    userEndpoints: 'معرّفة أعلاه'
  }
};
