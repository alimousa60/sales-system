# 📋 Phase 2 Integration Guide - RBAC مع server.js

## المقدمة
هذا الدليل يشرح بالضبط كيفية دمج نظام RBAC الذي تم بناؤه في Phase 1 مع server.js الموجود.

---

## الخطوة 1: تحديث User Schema

### الموقع: السطر 52-64 في server.js

**الحالي:**
```javascript
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
  lastLogin: Date
});
```

**الجديد (مع RBAC):**
```javascript
const userSchema = new mongoose.Schema({
  // الحقول الموجودة - بدون تغيير
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  
  // LEGACY SUPPORT - الدور القديم يبقى للتوافق
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  
  // RBAC FIELDS - الحقول الجديدة
  roleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role',
    sparse: true  // يمكن أن يكون null للتوافق مع البيانات القديمة
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'], 
    default: 'active' 
  },
  metadata: {
    department: String,
    location: String,
    managerId: mongoose.Schema.Types.ObjectId
  },
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date,
    lockedUntil: Date
  },
  
  // الحقول الموجودة
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
});
```

---

## الخطوة 2: إضافة RBAC Schema في MongoDB

### بعد User Schema (حول السطر 106):

```javascript
// ========== RBAC Schemas ==========

// Role Schema (للصلاحيات المتقدمة)
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  hierarchy: { type: Number, required: true, min: 1, max: 5 },
  isSystemRole: { type: Boolean, default: false },
  permissions: [{
    resource: String,
    actions: [String],
    constraints: {
      companyOnly: Boolean,
      departmentOnly: Boolean,
      ownDataOnly: Boolean
    }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Enhanced Audit Log Schema (للـ RBAC)
const rbacAuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  resource: String,
  resourceId: mongoose.Schema.Types.ObjectId,
  oldValues: mongoose.Schema.Types.Mixed,
  newValues: mongoose.Schema.Types.Mixed,
  status: { type: String, enum: ['success', 'failure'], default: 'success' },
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
}, { 
  // Auto-delete after 90 days
  expires: 7776000 
});

// Create Models
const Role = mongoose.model('Role', roleSchema);
const RBACauditLog = mongoose.model('RBACauditLog', rbacAuditLogSchema);
```

---

## الخطوة 3: استيراد RBAC Models و Middleware

### في أعلى الملف (بعد dotenv.config()):

```javascript
// ========== RBAC Imports ==========
const { seedRBACRoles } = require('./seeds/rbac.seed');
const { 
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC,
  checkBruteForce,
  logAuditTrailRBAC,
  validateOwnership,
  enforceCompanyIsolation,
  enforceDepartmentIsolation,
  PermissionChecker
} = require('./middleware/rbac.middleware');
```

---

## الخطوة 4: تحديث createJwtForUser

### الموقع: السطر 185-192

**الحالي:**
```javascript
function createJwtForUser(user) {
  return jwt.sign({ 
    userId: user._id, 
    username: user.username, 
    role: user.role, 
    companyId: user.companyId 
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
```

**الجديد (مع Permissions):**
```javascript
async function createJwtForUser(user, permissions = []) {
  // إذا لم نمرر الصلاحيات، نجلبها من الدور
  let userPermissions = permissions;
  if (userPermissions.length === 0 && user.roleId) {
    try {
      const roleDoc = await Role.findById(user.roleId);
      userPermissions = roleDoc?.permissions || [];
    } catch (err) {
      console.error('خطأ في جلب الصلاحيات:', err);
      userPermissions = [];
    }
  }

  return jwt.sign({ 
    userId: user._id, 
    username: user.username, 
    role: user.role,           // legacy support
    roleId: user.roleId,        // new RBAC
    status: user.status,
    companyId: user.companyId,
    permissions: userPermissions // cache permissions in JWT
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
```

---

## الخطوة 5: تحديث MongoDB Connection

### الموقع: السطر 42-47

**أضف بعد تسجيل الاتصال:**

```javascript
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✓ MongoDB متصل');
  
  // ========== RBAC Initialization ==========
  try {
    await seedRBACRoles();
    console.log('✓ RBAC Roles تمت تهيئتها');
  } catch (err) {
    console.error('✗ خطأ في تهيئة RBAC:', err);
  }
})
.catch(err => console.error('✗ خطأ الاتصال بـ MongoDB:', err));
```

---

## الخطوة 6: تحديث Login Endpoint مع Brute Force Protection

### الموقع: السطر 197-236

**الجديد (مع Brute Force):**

```javascript
// تسجيل الدخول (مع Brute Force Protection)
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'اسم المستخدم وكلمة المرور مطلوبان.' 
      });
    }

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'بيانات دخول غير صحيحة.' 
      });
    }

    // ========== BRUTE FORCE PROTECTION ==========
    // تحقق من القفل
    if (user.loginAttempts?.lockedUntil && user.loginAttempts.lockedUntil > new Date()) {
      const minutesRemaining = Math.ceil(
        (user.loginAttempts.lockedUntil - new Date()) / 60000
      );
      return res.status(429).json({ 
        status: 'error', 
        message: `الحساب مقفول. حاول بعد ${minutesRemaining} دقيقة` 
      });
    }

    // تحقق من حالة الحساب
    if (!user.isActive || user.status !== 'active') {
      return res.status(403).json({ 
        status: 'error', 
        message: 'حسابك غير نشط' 
      });
    }

    // تحقق من كلمة المرور
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!validPassword) {
      // زد محاولات الفشل
      user.loginAttempts = user.loginAttempts || { count: 0 };
      user.loginAttempts.count += 1;
      user.loginAttempts.lastAttempt = new Date();

      if (user.loginAttempts.count >= 5) {
        user.loginAttempts.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        
        // سجل محاولة الهجوم
        await RBACauditLog.create({
          userId: user._id,
          action: 'FAILED_LOGIN_LOCKED',
          resource: 'User',
          status: 'failure',
          ipAddress: req.ip
        });

        return res.status(429).json({ 
          status: 'error', 
          message: 'الحساب مقفول بسبب محاولات دخول متعددة' 
        });
      }

      await user.save();
      return res.status(401).json({ 
        status: 'error', 
        message: 'بيانات دخول غير صحيحة.' 
      });
    }

    // ========== SUCCESSFUL LOGIN ==========
    // إعادة تعيين محاولات الفشل
    user.loginAttempts = { count: 0, lastAttempt: null, lockedUntil: null };
    user.lastLogin = new Date();
    await user.save();

    // جلب الصلاحيات إذا كان هناك roleId
    let permissions = [];
    if (user.roleId) {
      const roleDoc = await Role.findById(user.roleId);
      permissions = roleDoc?.permissions || [];
    }

    // إنشاء JWT مع الصلاحيات
    const token = await createJwtForUser(user, permissions);

    // سجل تسجيل الدخول الناجح
    await RBACauditLog.create({
      userId: user._id,
      action: 'LOGIN',
      resource: 'User',
      status: 'success',
      ipAddress: req.ip
    });

    // سجل في الـ AuditLog القديم أيضاً للتوافق
    await logAudit(user._id, 'LOGIN', 'User', user._id.toString(), null, req);

    res.json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        roleId: user.roleId,
        status: user.status,
        companyId: user.companyId,
        permissions: permissions
      }
    });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});
```

---

## الخطوة 7: إضافة Logout Endpoint

### بعد Login endpoint:

```javascript
// تسجيل الخروج
app.post('/api/v1/auth/logout', authenticateTokenRBAC, async (req, res) => {
  try {
    // سجل تسجيل الخروج
    await RBACauditLog.create({
      userId: req.user?.userId,
      action: 'LOGOUT',
      resource: 'User',
      status: 'success',
      ipAddress: req.ip
    });

    res.json({ 
      status: 'success', 
      message: 'تم تسجيل الخروج بنجاح' 
    });
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
  }
});
```

---

## الخطوة 8: إضافة User Management Endpoints

### بعد logout endpoint:

```javascript
// ========== USER MANAGEMENT ENDPOINTS (RBAC) ==========

// GET /api/v1/users - قائمة المستخدمين
app.get('/api/v1/users', 
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('users', 'read'),
  logAuditTrailRBAC,
  enforceCompanyIsolation,
  async (req, res) => {
    try {
      const { role, status, department, page = 1, limit = 20 } = req.query;
      
      let filter = { companyId: req.user.companyId };
      
      if (role) filter.role = role;
      if (status) filter.status = status;
      if (department) filter['metadata.department'] = department;
      
      // إذا كان المستخدم Manager، اعرض موظفيه فقط
      if (req.user.role === 'manager') {
        filter['metadata.managerId'] = req.user.userId;
      }
      
      const skip = (page - 1) * limit;
      const users = await User
        .find(filter)
        .select('-passwordHash')
        .populate('roleId', 'name description hierarchy')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await User.countDocuments(filter);
      
      res.json({
        status: 'success',
        data: users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('خطأ في جلب المستخدمين:', error);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
);

// GET /api/v1/users/:userId - معلومات مستخدم واحد
app.get('/api/v1/users/:userId',
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('users', 'read'),
  logAuditTrailRBAC,
  validateOwnership,
  enforceCompanyIsolation,
  async (req, res) => {
    try {
      const user = await User
        .findById(req.params.userId)
        .select('-passwordHash')
        .populate('roleId', 'name description hierarchy permissions');
      
      if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'المستخدم غير موجود' 
        });
      }
      
      res.json({ status: 'success', data: user });
    } catch (error) {
      console.error('خطأ في جلب المستخدم:', error);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
);

// PATCH /api/v1/users/:userId/role - تغيير الدور
app.patch('/api/v1/users/:userId/role',
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('users', 'update'),
  logAuditTrailRBAC,
  enforceCompanyIsolation,
  async (req, res) => {
    try {
      const { roleId } = req.body;
      
      if (!roleId) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'roleId مطلوب' 
        });
      }
      
      // تحقق من أن الدور موجود
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'الدور غير موجود' 
        });
      }
      
      const user = await User.findById(req.params.userId);
      if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'المستخدم غير موجود' 
        });
      }
      
      // منع تغيير دور الـ SuperUser
      if (user.roleId && (await Role.findById(user.roleId))?.hierarchy === 1) {
        return res.status(403).json({ 
          status: 'error', 
          message: 'لا يمكن تغيير دور SuperUser' 
        });
      }
      
      const oldRole = user.roleId;
      user.roleId = roleId;
      user.role = role.name.toLowerCase(); // للتوافق مع النظام القديم
      await user.save();
      
      // سجل التغيير
      await RBACauditLog.create({
        userId: req.user.userId,
        action: 'CHANGE_USER_ROLE',
        resource: 'User',
        resourceId: user._id,
        oldValues: { roleId: oldRole },
        newValues: { roleId },
        status: 'success',
        ipAddress: req.ip
      });
      
      res.json({ 
        status: 'success', 
        message: 'تم تحديث الدور بنجاح',
        data: user 
      });
    } catch (error) {
      console.error('خطأ في تحديث الدور:', error);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
);

// PATCH /api/v1/users/:userId/status - تغيير حالة الحساب
app.patch('/api/v1/users/:userId/status',
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('users', 'update'),
  logAuditTrailRBAC,
  enforceCompanyIsolation,
  async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!['active', 'inactive', 'suspended'].includes(status)) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'حالة غير صحيحة' 
        });
      }
      
      const user = await User.findById(req.params.userId);
      if (!user || user.companyId.toString() !== req.user.companyId.toString()) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'المستخدم غير موجود' 
        });
      }
      
      const oldStatus = user.status;
      user.status = status;
      user.isActive = status === 'active';
      await user.save();
      
      // سجل التغيير
      await RBACauditLog.create({
        userId: req.user.userId,
        action: 'CHANGE_USER_STATUS',
        resource: 'User',
        resourceId: user._id,
        oldValues: { status: oldStatus },
        newValues: { status },
        status: 'success',
        ipAddress: req.ip
      });
      
      res.json({ 
        status: 'success', 
        message: 'تم تحديث الحالة بنجاح',
        data: user 
      });
    } catch (error) {
      console.error('خطأ في تحديث الحالة:', error);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
);

// GET /api/v1/audit-log - سجل التدقيق
app.get('/api/v1/audit-log',
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('audit', 'read'),
  logAuditTrailRBAC,
  async (req, res) => {
    try {
      const { userId, action, page = 1, limit = 20 } = req.query;
      
      let filter = {};
      if (userId) filter.userId = userId;
      if (action) filter.action = action;
      
      const skip = (page - 1) * limit;
      const logs = await RBACauditLog
        .find(filter)
        .populate('userId', 'username name')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await RBACauditLog.countDocuments(filter);
      
      res.json({
        status: 'success',
        data: logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('خطأ في جلب السجلات:', error);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
);
```

---

## الخطوة 9: تحديث الـ Existing Endpoints

### تحديث Create User Endpoint:

**أضف RBAC checks:**

```javascript
app.post('/api/v1/auth/create-user', 
  authenticateTokenRBAC,
  checkAccountStatus,
  checkPermissionRBAC('users', 'create'),
  logAuditTrailRBAC,
  enforceCompanyIsolation,
  async (req, res) => {
    // ... existing code
    // + استخدم roleId من الـ request
  }
);
```

---

## الخطوة 10: MongoDB Indexes

### أضف بعد model creation:

```javascript
// ========== MONGODB INDEXES ==========

// User Indexes
User.collection.createIndex({ roleId: 1 });
User.collection.createIndex({ companyId: 1, status: 1 });
User.collection.createIndex({ 'loginAttempts.lockedUntil': 1 });
User.collection.createIndex({ username: 1 });

// Role Indexes
Role.collection.createIndex({ name: 1 });
Role.collection.createIndex({ hierarchy: 1 });

// AuditLog Indexes
RBACauditLog.collection.createIndex({ userId: 1, createdAt: -1 });
RBACauditLog.collection.createIndex({ createdAt: 1 }, { 
  expireAfterSeconds: 7776000 // 90 days
});
```

---

## ملخص التغييرات

| الملف | التغييرات | الأهمية |
|------|----------|--------|
| `server.js` | +200 سطر | تكامل كامل |
| `models/rbac.models.js` | بدون تعديل | جاهز |
| `middleware/rbac.middleware.js` | بدون تعديل | جاهز |
| `seeds/rbac.seed.js` | بدون تعديل | جاهز |

---

## الاختبار

### 1. اختبر Login مع Brute Force:
```bash
# 5 محاولات فاشلة
curl -X POST http://localhost:3000/api/v1/auth/login \
  -d '{"username":"admin","password":"wrong"}' \
  -H "Content-Type: application/json"

# يجب أن يقفل الحساب بعد المحاولة الخامسة
```

### 2. اختبر User Management:
```bash
# احصل على قائمة المستخدمين
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $TOKEN"

# غيّر دور المستخدم
curl -X PATCH http://localhost:3000/api/v1/users/USER_ID/role \
  -d '{"roleId":"ROLE_ID"}' \
  -H "Authorization: Bearer $TOKEN"
```

---

## الخطوات التالية

✅ Phase 2: Integrate RBAC (هذا الدليل)
⏳ Phase 3: User Management UI
⏳ Phase 4: Advanced Features
⏳ Phase 5: Testing & Documentation
