# 📚 RBAC API Reference - المرحلة الثانية

**الإصدار:** v2.0.0  
**التاريخ:** 2024-06-16  
**الحالة:** ✅ Production Ready

---

## 📋 قائمة الـ Endpoints

### Authentication (المصادقة)
- `POST /api/v1/auth/login` - تسجيل دخول
- `POST /api/v1/auth/logout` - تسجيل خروج
- `POST /api/v1/auth/create-user` - إنشاء مستخدم جديد (Admin)

### User Management (إدارة المستخدمين)
- `GET /api/v1/users` - قائمة المستخدمين
- `GET /api/v1/users/:userId` - معلومات مستخدم واحد
- `PATCH /api/v1/users/:userId/role` - تغيير الدور
- `PATCH /api/v1/users/:userId/status` - تغيير الحالة

### Audit & System (التدقيق والنظام)
- `GET /api/v1/audit-log` - سجل التدقيق
- `GET /api/v1/status` - حالة النظام

---

## 🔐 Authentication Endpoints

### 1. POST /api/v1/auth/login

**الوصف:** تسجيل دخول المستخدم

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "name": "Admin User",
    "role": "admin",
    "roleId": "507f1f77bcf86cd799439012",
    "status": "active",
    "companyId": "507f1f77bcf86cd799439010",
    "permissions": [
      {
        "resource": "users",
        "actions": ["create", "read", "update", "delete"],
        "constraints": {"companyOnly": true}
      }
    ]
  }
}
```

**Error Responses:**
- `400` - Missing username or password
- `401` - Invalid credentials
- `403` - Account inactive
- `429` - Account locked (Brute Force)

**Brute Force Protection:**
- 5 failed attempts → Account locked for 15 minutes
- Each locked attempt returns: `429 "الحساب مقفول. حاول بعد X دقيقة"`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

---

### 2. POST /api/v1/auth/logout

**الوصف:** تسجيل خروج المستخدم

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "تم تسجيل الخروج بنجاح"
}
```

**Error Responses:**
- `401` - Invalid or missing token

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

---

### 3. POST /api/v1/auth/create-user

**الوصف:** إنشاء مستخدم جديد (الإدمين فقط)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newuser",
  "password": "secure_password",
  "name": "New User",
  "email": "newuser@example.com",
  "role": "manager",
  "companyId": "507f1f77bcf86cd799439010"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "تم إنشاء المستخدم بنجاح",
  "user": {
    "id": "507f1f77bcf86cd799439013",
    "username": "newuser",
    "name": "New User",
    "role": "manager",
    "email": "newuser@example.com",
    "companyId": "507f1f77bcf86cd799439010"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or invalid role
- `403` - Insufficient permissions (not admin)
- `409` - Username already exists

---

## 👥 User Management Endpoints

### 4. GET /api/v1/users

**الوصف:** احصل على قائمة المستخدمين

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
page=1          # صفحة النتائج (default: 1)
limit=20        # عدد النتائج لكل صفحة (default: 20)
role=admin      # فلترة حسب الدور (optional)
status=active   # فلترة حسب الحالة (optional)
```

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "admin",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active",
      "companyId": "507f1f77bcf86cd799439010",
      "roleId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Admin",
        "description": "Administrator",
        "hierarchy": 2
      },
      "createdAt": "2024-06-16T12:00:00.000Z",
      "updatedAt": "2024-06-16T14:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

**cURL Examples:**
```bash
# احصل على الصفحة الأولى
curl -X GET "http://localhost:3000/api/v1/users" \
  -H "Authorization: Bearer $TOKEN"

# فلترة حسب الدور
curl -X GET "http://localhost:3000/api/v1/users?role=admin" \
  -H "Authorization: Bearer $TOKEN"

# فلترة حسب الحالة مع pagination
curl -X GET "http://localhost:3000/api/v1/users?status=active&page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 5. GET /api/v1/users/:userId

**الوصف:** احصل على معلومات مستخدم واحد

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
```
userId - معرف المستخدم (MongoDB ObjectId)
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "status": "active",
    "companyId": "507f1f77bcf86cd799439010",
    "roleId": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin",
      "description": "Administrator",
      "hierarchy": 2,
      "permissions": [
        {
          "resource": "users",
          "actions": ["create", "read", "update", "delete"],
          "constraints": {"companyOnly": true}
        }
      ]
    },
    "metadata": {
      "department": "IT",
      "location": "Cairo"
    },
    "loginAttempts": {
      "count": 0,
      "lastAttempt": null,
      "lockedUntil": null
    },
    "createdAt": "2024-06-16T12:00:00.000Z",
    "updatedAt": "2024-06-16T14:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Invalid or missing token
- `404` - User not found or not in same company

**cURL Example:**
```bash
curl -X GET "http://localhost:3000/api/v1/users/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 6. PATCH /api/v1/users/:userId/role

**الوصف:** غيّر دور المستخدم (الإدمين فقط)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "roleId": "507f1f77bcf86cd799439012"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "تم تحديث الدور بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "manager1",
    "name": "Manager One",
    "role": "manager",
    "roleId": "507f1f77bcf86cd799439012",
    "status": "active",
    "updatedAt": "2024-06-16T14:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing roleId
- `401` - Invalid or missing token
- `403` - Insufficient permissions (not admin)
- `404` - User or role not found

**cURL Example:**
```bash
curl -X PATCH "http://localhost:3000/api/v1/users/507f1f77bcf86cd799439011/role" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"roleId": "507f1f77bcf86cd799439012"}'
```

**Audit Log:**
- Action: `CHANGE_USER_ROLE`
- Records: oldValues (previous roleId), newValues (new roleId)

---

### 7. PATCH /api/v1/users/:userId/status

**الوصف:** غيّر حالة الحساب (الإدمين فقط)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "suspended"
}
```

**Valid Status Values:**
- `active` - الحساب نشط
- `inactive` - الحساب غير نشط
- `suspended` - الحساب معطّل

**Response (200):**
```json
{
  "status": "success",
  "message": "تم تحديث الحالة بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "user1",
    "status": "suspended",
    "isActive": false,
    "updatedAt": "2024-06-16T14:35:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid status value
- `401` - Invalid or missing token
- `403` - Insufficient permissions
- `404` - User not found

**cURL Example:**
```bash
# علّق الحساب
curl -X PATCH "http://localhost:3000/api/v1/users/507f1f77bcf86cd799439011/status" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "suspended"}'

# فعّل الحساب
curl -X PATCH "http://localhost:3000/api/v1/users/507f1f77bcf86cd799439011/status" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

**Audit Log:**
- Action: `CHANGE_USER_STATUS`
- Records: oldValues (previous status), newValues (new status)

---

## 📊 Audit & System Endpoints

### 8. GET /api/v1/audit-log

**الوصف:** احصل على سجل التدقيق (الإدمين فقط)

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
page=1          # صفحة النتائج (default: 1)
limit=20        # عدد النتائج (default: 20)
userId=<id>     # فلترة حسب المستخدم (optional)
action=LOGIN    # فلترة حسب الإجراء (optional)
```

**Valid Action Values:**
- `LOGIN` - تسجيل دخول
- `LOGOUT` - تسجيل خروج
- `FAILED_LOGIN_LOCKED` - فشل تسجيل دخول وقفل الحساب
- `CHANGE_USER_ROLE` - تغيير الدور
- `CHANGE_USER_STATUS` - تغيير الحالة
- وغيره...

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "admin",
        "name": "Admin User"
      },
      "action": "LOGIN",
      "resource": "User",
      "status": "success",
      "ipAddress": "192.168.1.100",
      "createdAt": "2024-06-16T14:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "admin",
        "name": "Admin User"
      },
      "action": "CHANGE_USER_ROLE",
      "resource": "User",
      "resourceId": "507f1f77bcf86cd799439020",
      "oldValues": {"roleId": "507f1f77bcf86cd799439012"},
      "newValues": {"roleId": "507f1f77bcf86cd799439013"},
      "status": "success",
      "ipAddress": "192.168.1.100",
      "createdAt": "2024-06-16T14:05:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

**cURL Examples:**
```bash
# احصل على آخر السجلات
curl -X GET "http://localhost:3000/api/v1/audit-log" \
  -H "Authorization: Bearer $TOKEN"

# فلترة حسب الإجراء
curl -X GET "http://localhost:3000/api/v1/audit-log?action=LOGIN" \
  -H "Authorization: Bearer $TOKEN"

# فلترة حسب المستخدم
curl -X GET "http://localhost:3000/api/v1/audit-log?userId=507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer $TOKEN"

# Pagination
curl -X GET "http://localhost:3000/api/v1/audit-log?page=2&limit=50" \
  -H "Authorization: Bearer $TOKEN"
```

**Data Retention:**
- السجلات تُحذف تلقائياً بعد 90 يوم
- TTL Index متفعّل

---

### 9. GET /api/v1/status

**الوصف:** حالة النظام

**Response (200):**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-06-16T14:40:00.488Z",
  "database": "connected",
  "rbac": "enabled"
}
```

**No Authentication Required**

**cURL Example:**
```bash
curl http://localhost:3000/api/v1/status
```

---

## 🔑 Token Format

### JWT Payload:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "username": "admin",
  "role": "admin",
  "roleId": "507f1f77bcf86cd799439012",
  "status": "active",
  "companyId": "507f1f77bcf86cd799439010",
  "permissions": [
    {
      "resource": "users",
      "actions": ["create", "read", "update", "delete"],
      "constraints": {"companyOnly": true}
    }
  ],
  "iat": 1718540400,
  "exp": 1718547600
}
```

### Token Expiration:
- Default: 2 hours (7200 seconds)
- After expiration: `401 "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى."`

---

## ⚠️ Error Handling

### Standard Error Response:
```json
{
  "status": "error",
  "message": "وصف الخطأ بالعربية"
}
```

### HTTP Status Codes:
| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `429` | Too Many Requests |
| `500` | Server Error |

---

## 🔒 Security Headers

كل الـ requests يجب أن تتضمن:
```
Authorization: Bearer <token>
Content-Type: application/json (for POST/PATCH)
```

---

## 📈 Rate Limiting

- **Login:** 5 requests per 15 minutes per IP
- **API:** 100 requests per 15 minutes per IP
- **Brute Force:** 5 failed login attempts → 15 min account lock

---

## ✅ API Version

```
Version: 1.0.0
Date: 2024-06-16
Status: Production
Base URL: http://localhost:3000/api/v1
```

---

**آخر تحديث:** 2024-06-16  
**الحالة:** ✅ Complete & Production Ready
