# 🚀 نظام المبيعات المتقدم - الإصدار 1.0

## ✨ الميزات الجديدة

### 1️⃣ **عزل البيانات** (Data Isolation)
- ✅ كل مستخدم يرى **فقط بيانات نفسه**
- ✅ فصل كامل على مستوى قاعدة البيانات (Row-Level Security)
- ✅ كل شركة لها بياناتها المستقلة

### 2️⃣ **إدارة المستخدمين المركزية**
- ✅ الإدارة الكاملة للمستخدمين من قبل المسؤولين فقط
- ✅ ثلاث مستويات صلاحيات: Admin, Manager, User
- ✅ تفعيل/تعطيل المستخدمين
- ✅ تتبع من أنشأ كل مستخدم ومتى

### 3️⃣ **قاعدة بيانات قوية** (MongoDB)
- ✅ استبدال الذاكرة المؤقتة بـ MongoDB
- ✅ قابلة للتوسع والنمو
- ✅ نسخ احتياطية وتعافي سهل

### 4️⃣ **سجل التدقيق** (Audit Logging)
- ✅ تسجيل كل عملية حساسة
- ✅ من عمل ماذا ومتى
- ✅ التغييرات التي تم إجراؤها
- ✅ عنوان IP والمتصفح

### 5️⃣ **الحماية من الهجمات**
- ✅ تحديد معدل الطلبات (Rate Limiting)
- ✅ حماية من هجمات Brute Force على تسجيل الدخول
- ✅ Headers الأمان (Helmet)
- ✅ تشفير كلمات المرور

---

## 🔧 التثبيت والإعداد

### المتطلبات
- Node.js 18+ أو 20+
- MongoDB 4.4+ (محلي أو Atlas)

### الخطوات

#### 1. استنساخ/تحضير المشروع
```bash
cd sales-system
```

#### 2. تثبيت المكتبات
```bash
npm install
```

#### 3. إنشاء ملف .env
```bash
cp .env.example .env
# عدّل .env حسب إعداداتك
```

#### 4. تهيئة قاعدة البيانات
```bash
node init-db.js
```

#### 5. تشغيل الخادم
```bash
npm run dev
```

**النتيجة:**
```
✓ MongoDB متصل
✓ نظام المبيعات يعمل على http://localhost:3000
```

---

## 📚 API الجديد

### المصادقة

#### تسجيل الدخول
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**الرد:**
```json
{
  "status": "success",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "name": "مدير النظام",
    "role": "admin",
    "companyId": "507f1f77bcf86cd799439012"
  }
}
```

### إدارة المستخدمين (Admin فقط)

#### إنشاء مستخدم
```http
POST /api/v1/auth/create-user
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "user2",
  "password": "secure_password",
  "name": "علي محمود",
  "email": "ali@company.ly",
  "role": "user"
}
```

#### الحصول على قائمة المستخدمين
```http
GET /api/v1/admin/users
Authorization: Bearer {token}
```

#### تحديث مستخدم
```http
PUT /api/v1/admin/users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "علي محمود (محدّث)",
  "role": "manager",
  "isActive": true
}
```

#### حذف مستخدم
```http
DELETE /api/v1/admin/users/{userId}
Authorization: Bearer {token}
```

### سجلات التدقيق (Admin فقط)

#### الحصول على السجلات
```http
GET /api/v1/admin/audit-logs?limit=50&skip=0
Authorization: Bearer {token}
```

### المزامنة

#### دفع البيانات
```http
POST /api/v1/sync/push
Authorization: Bearer {token}
Content-Type: application/json

[
  {
    "name": "حسابي الأول",
    "balance": 5000
  },
  {
    "name": "حسابي الثاني",
    "balance": 12000
  }
]
```

#### سحب البيانات
```http
GET /api/v1/sync/pull
Authorization: Bearer {token}
```

### الحسابات المالية

#### الحصول على قائمة الحسابات
```http
GET /api/v1/accounts
Authorization: Bearer {token}
```

#### إنشاء حساب جديد
```http
POST /api/v1/accounts
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "صندوق الشركة",
  "balance": 15000
}
```

#### تحديث حساب
```http
PATCH /api/v1/accounts/{accountId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "صندوق الدفع",
  "balance": 16000
}
```

#### حذف حساب
```http
DELETE /api/v1/accounts/{accountId}
Authorization: Bearer {token}
```

### المعاملات المالية

#### إنشاء معاملة
```http
POST /api/v1/transactions
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "payment",
  "direction": "credit",
  "amount": 2500,
  "currency": "LYD",
  "paymentMethod": "bank_transfer",
  "description": "دفعة عميل"
}
```

#### استعلام المعاملات
```http
GET /api/v1/transactions?limit=25&page=1
Authorization: Bearer {token}
```

#### الحصول على معاملة واحدة
```http
GET /api/v1/transactions/{transactionId}
Authorization: Bearer {token}
```

#### تحديث حالة معاملة
```http
PATCH /api/v1/transactions/{transactionId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "pending",
  "approvalNote": "بانتظار التحقق"
}
```

#### تسوية معاملة
```http
POST /api/v1/transactions/{transactionId}/reconcile
Authorization: Bearer {token}
```
```

---

## 🔐 نموذج الصلاحيات

| الميزة | Admin | Manager | User |
|--------|-------|---------|------|
| إنشاء مستخدمين | ✅ | ❌ | ❌ |
| تحرير المستخدمين | ✅ | ❌ | ❌ |
| حذف المستخدمين | ✅ | ❌ | ❌ |
| عرض سجلات التدقيق | ✅ | ❌ | ❌ |
| مزامنة البيانات | ✅ | ✅ | ✅ |
| عرض بيانات نفسه فقط | ✅ | ✅ | ✅ |

---

## 🎯 التحسينات المستقبلية المقترحة

### 📊 Phase 2 - التقارير والتحليلات
- [ ] لوحة معلومات تفاعلية (Dashboard)
- [ ] تقارير المبيعات والعائدات
- [ ] رسوم بيانية متقدمة
- [ ] تصدير PDF/Excel
- [ ] تنبيهات وإشعارات

### 🔔 Phase 3 - الإشعارات والتكامل
- [ ] البريد الإلكتروني للمستخدمين الجدد
- [ ] تنبيهات SMS للعمليات الحساسة
- [ ] تكامل مع بوابات الدفع
- [ ] تكامل مع أنظمة ERP
- [ ] API للتطبيقات الخارجية

### 🌐 Phase 4 - الواجهة الأمامية
- [ ] تطبيق ويب حديث (React/Vue.js)
- [ ] تطبيق جوال (React Native/Flutter)
- [ ] واجهة مسؤول محسّنة
- [ ] دعم الوضع الداكن

### 🔄 Phase 5 - الميزات المتقدمة
- [ ] مزامنة Offline-First مع Service Workers
- [ ] نسخ احتياطية تلقائية
- [ ] استعادة الكوارث (Disaster Recovery)
- [ ] دعم تعدد العملات
- [ ] نظام الأذونات المتقدم (RBAC)

### 📱 Phase 6 - التحسينات التقنية
- [ ] Unit Tests و Integration Tests
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Docker containers
- [ ] Kubernetes deployment
- [ ] Monitoring و Logging متقدم (ELK Stack)
- [ ] Caching (Redis)
- [ ] Load Balancing

### 🌍 Phase 7 - العولمة
- [ ] دعم لغات متعددة
- [ ] معايير محلية (الضرائب، العملات)
- [ ] توقيت محلي (Timezones)
- [ ] نسخ النظام في مناطق مختلفة

---

## 📖 أمثلة عملية

### مثال: إنشاء مستخدم جديد

```bash
# 1. تسجيل الدخول بحساب الإدارة
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# الحصول على: TOKEN = eyJhbGc...

# 2. إنشاء مستخدم جديد
curl -X POST http://localhost:3000/api/v1/auth/create-user \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "username": "salesman1",
    "password": "sales@123",
    "name": "أحمد الشيباني",
    "email": "ahmad@company.ly",
    "role": "user"
  }'

# 3. المستخدم الجديد يمكنه تسجيل الدخول الآن
```

---

## 🐛 استكشاف الأخطاء

### MongoDB غير متصل
```
❌ خطأ الاتصال بـ MongoDB: connect ECONNREFUSED
```
**الحل:** تأكد من تشغيل MongoDB أو استخدم MongoDB Atlas

### "اسم المستخدم موجود بالفعل"
**الحل:** استخدم اسم مستخدم فريد

### "ممنوع: مطلوب صلاحيات الإدارة"
**الحل:** استخدم حساب مسؤول فقط لهذه العمليات

---

## 📞 الدعم والتطوير

### المشاركة في التطوير
- اقترح ميزات جديدة
- بلّغ عن الأخطاء
- ساهم في تحسين الكود

### الأمان
- تغيير `JWT_SECRET` في الإنتاج
- استخدام HTTPS دائماً
- تحديث التبعيات بانتظام

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

**آخر تحديث:** يونيو 2026
**النسخة:** 1.0.0
**الحالة:** ✅ جاهز للإنتاج
