# 🚀 RBAC Phase 2 - Quick Start Guide

## خطوات البدء الفوري (5 دقائق)

### ✅ الخطوة 1: التحقق من الملفات

```bash
# تأكد من وجود جميع ملفات RBAC
cd C:\Users\PC3\Desktop\sales-system

ls -la models/rbac.models.js
ls -la middleware/rbac.middleware.js
ls -la seeds/rbac.seed.js

# يجب أن ترى 3 ملفات موجودة ✓
```

### ✅ الخطوة 2: بدء التشغيل

```bash
# من داخل مجلد sales-system
node server.js

# يجب أن ترى:
# ✓ MongoDB متصل
# ✓ RBAC Roles تمت تهيئتها
# 🚀 Server running on port 3000
```

### ✅ الخطوة 3: اختبار التشغيل

```bash
# افتح Terminal آخر واختبر status
curl http://localhost:3000/api/v1/status

# يجب أن تحصل على:
# {
#   "status": "ok",
#   "version": "1.0.0",
#   "database": "connected",
#   "rbac": "enabled"
# }
```

---

## 🔑 اختبار Brute Force Protection

### الاختبار الكامل (3 دقائق)

```bash
# 1. تسجيل دخول ناجح أولاً لمعرفة البيانات
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }' | jq

# يجب أن تحصل على:
# {
#   "status": "success",
#   "token": "eyJhbGc...",
#   "user": {
#     "id": "...",
#     "username": "admin",
#     "role": "admin",
#     "status": "active",
#     "permissions": [...]
#   }
# }

# 2. حاول 5 مرات بـ password خاطئ
for i in {1..5}; do
  echo "محاولة $i"
  curl -X POST http://localhost:3000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "username": "admin",
      "password": "wrong"
    }' | jq '.message'
  sleep 1
done

# النتيجة:
# محاولة 1: "بيانات دخول غير صحيحة."
# محاولة 2: "بيانات دخول غيرصحيحة."
# محاولة 3: "بيانات دخول غيرصحيحة."
# محاولة 4: "بيانات دخول غير صحيحة."
# محاولة 5: "الحساب مقفول بسبب محاولات دخول متعددة"

# 3. تحقق من رسالة Brute Force
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }' | jq '.message'

# النتيجة:
# "الحساب مقفول. حاول بعد 15 دقيقة"

# ✅ Brute Force Protection يعمل!
```

---

## 👤 اختبار User Management

### احفظ التوكن أولاً

```bash
# احصل على TOKEN من تسجيل دخول ناجح
export TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }' | jq -r '.token')

echo "Token: $TOKEN"
```

### الآن اختبر الـ Endpoints

#### 1. احصل على قائمة المستخدمين

```bash
curl -X GET "http://localhost:3000/api/v1/users" \
  -H "Authorization: Bearer $TOKEN" | jq

# النتيجة:
# {
#   "status": "success",
#   "data": [
#     {
#       "_id": "...",
#       "username": "admin",
#       "name": "Admin User",
#       "role": "admin",
#       "status": "active",
#       "roleId": {...}
#     }
#   ],
#   "pagination": {
#     "total": 3,
#     "page": 1,
#     "limit": 20,
#     "pages": 1
#   }
# }
```

#### 2. احصل على معلومات مستخدم واحد

```bash
# أحتاج USER_ID أولاً - استخدم من النتيجة السابقة
export USER_ID="<the_id_from_above>"

curl -X GET "http://localhost:3000/api/v1/users/$USER_ID" \
  -H "Authorization: Bearer $TOKEN" | jq

# ترى كل تفاصيل المستخدم
```

#### 3. غيّر دور المستخدم

```bash
# أحتاج ROLE_ID - افتح MongoDB Compass وجد role ID
# أو استخدم هذا الأمر للبحث:

curl -X GET "http://localhost:3000/api/v1/users" \
  -H "Authorization: Bearer $TOKEN" | jq '.data[0].roleId._id'

# عندما تحصل على ROLE_ID:
export ROLE_ID="<the_role_id>"

curl -X PATCH "http://localhost:3000/api/v1/users/$USER_ID/role" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"roleId\": \"$ROLE_ID\"}" | jq

# يجب أن ترى:
# {
#   "status": "success",
#   "message": "تم تحديث الدور بنجاح",
#   "data": {...}
# }
```

#### 4. غيّر حالة الحساب

```bash
curl -X PATCH "http://localhost:3000/api/v1/users/$USER_ID/status" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "suspended"}' | jq

# يجب أن يتغير الـ status إلى "suspended"
```

#### 5. احصل على سجل التدقيق

```bash
curl -X GET "http://localhost:3000/api/v1/audit-log" \
  -H "Authorization: Bearer $TOKEN" | jq

# يجب أن ترى جميع الإجراءات:
# - LOGIN
# - CHANGE_USER_ROLE
# - CHANGE_USER_STATUS
# - إلخ
```

---

## 🔐 اختبر Logout

```bash
curl -X POST "http://localhost:3000/api/v1/auth/logout" \
  -H "Authorization: Bearer $TOKEN" | jq

# يجب أن تحصل على:
# {
#   "status": "success",
#   "message": "تم تسجيل الخروج بنجاح"
# }
```

---

## 📊 اختبر Status Endpoint

```bash
curl http://localhost:3000/api/v1/status | jq

# يجب أن ترى:
# {
#   "status": "ok",
#   "version": "1.0.0",
#   "timestamp": "2024-06-16T14:19:48.488Z",
#   "database": "connected",
#   "rbac": "enabled"
# }
```

---

## 🎯 نقاط التحقق (Checklist)

### ✅ المراحل الأساسية
- [ ] `node server.js` يعمل بدون أخطاء
- [ ] MongoDB متصل
- [ ] RBAC Roles تمت تهيئتها
- [ ] Status endpoint يعود "rbac": "enabled"

### ✅ المصادقة (Authentication)
- [ ] Login ناجح يعيد token
- [ ] Token يحتوي على permissions
- [ ] Brute Force protection يعمل (5 محاولات فاشلة تقفل الحساب)
- [ ] Logout يعمل بدون أخطاء

### ✅ إدارة المستخدمين (User Management)
- [ ] GET /users يعيد قائمة المستخدمين
- [ ] GET /users/:id يعيد مستخدم واحد
- [ ] PATCH /users/:id/role يغيّر الدور
- [ ] PATCH /users/:id/status يغيّر الحالة

### ✅ التدقيق (Audit)
- [ ] GET /audit-log يعيد السجلات
- [ ] السجلات تتضمن: LOGIN, LOGOUT, CHANGE_USER_ROLE, CHANGE_USER_STATUS

---

## ❌ استكشاف الأخطاء

### خطأ: "Cannot find module './seeds/rbac.seed'"

**الحل:**
```bash
# تأكد من وجود الملف
ls models/rbac.models.js
ls middleware/rbac.middleware.js
ls seeds/rbac.seed.js

# إذا كانت الملفات موجودة، حاول:
npm install
node server.js
```

### خطأ: JWT validation failed

**الحل:**
```bash
# تأكد من أن TOKEN صحيح
echo $TOKEN

# تأكد من format "Bearer TOKEN"
# يجب أن يبدأ بـ Bearer

# جرب مع token جديد
export TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}' | jq -r '.token')
```

### خطأ: "Role not found"

**الحل:**
```bash
# تحقق من RBAC initialization
# يجب أن ترى في logs:
# ✓ RBAC Roles تمت تهيئتها

# إذا لم تراها، أعد تشغيل:
# 1. احذف البيانات في MongoDB (Users collection)
# 2. أعد تشغيل node server.js
```

### خطأ: MongoDB connection error

**الحل:**
```bash
# تأكد من أن MongoDB قيد التشغيل
mongod --version

# إذا لم يكن مثبتاً:
# MongoDB Atlas: استخدم cloud connection
# أو: brew install mongodb-community (على Mac)
# أو: choco install mongodb (على Windows)
```

---

## 📚 المزيد من الموارد

- 📖 **دليل كامل:** `docs/server-phase2-integration-guide.md`
- ❓ **أسئلة شائعة:** `docs/RBAC_FAQ.md`
- 📊 **تقرير الحالة:** `docs/RBAC_DEVELOPMENT_REPORT.md`
- ✅ **Checklist:** `docs/RBAC_CHECKLIST.md`

---

## 🎉 النتيجة

**بعد إكمال اختباراتك:**
```
✅ RBAC Integration: Complete
✅ Brute Force Protection: Active
✅ User Management: Functional
✅ Audit Logging: Recording
✅ Status: 🟢 Ready for Phase 3
```

---

**الخطوة التالية:** Phase 3 - Frontend User Management UI

**الوقت:** ~3-4 أيام لـ Phase 3

**التقدم:** 60% من المشروع الكامل ✅
