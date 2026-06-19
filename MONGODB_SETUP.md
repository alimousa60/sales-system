# MongoDB Setup Guide for Sales System

## Current Status
✅ Backend is ready and waiting for MongoDB connection
✅ Dependencies installed
✅ `.env` file created with default configuration

## ⚠️ What You Need to Do

The system requires **MongoDB** to function. You have three options:

---

## Option 1: MongoDB Atlas (Easiest - Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account (no payment required for testing)
3. Create a cluster (free tier available)
4. Get connection string: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sales-system`
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sales-system
   ```

---

## Option 2: Local MongoDB (Windows)

1. Download from: https://www.mongodb.com/try/download/community
2. Run installer and follow setup (recommended: leave default port 27017)
3. Keep MongoDB running:
   ```powershell
   mongod
   ```
4. Default `.env` will work:
   ```
   MONGODB_URI=mongodb://localhost:27017/sales-system
   ```

---

## Option 3: Docker (If Docker Available)

```bash
docker-compose up -d
# This will start MongoDB container on port 27017
```

---

## After Configuring MongoDB

### 1. Initialize Database
```bash
node init-db.js
```

Expected output:
```
✓ MongoDB متصل
✓ نظام المبيعات يعمل على http://localhost:3000
```

### 2. Start Backend Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 3. Open Frontend
```
http://localhost:5500
```

---

## 🔑 Default Credentials (After Init)

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| User | `user1` | `user123` |

⚠️ **Change these in production!**

---

## Troubleshooting

### Server exits immediately
→ Check `.env` MONGODB_URI is correct

### Connection timeout
→ Verify MongoDB is running (for local) or credentials are correct (for Atlas)

### Database already exists
→ This is fine, init-db.js will skip creation

For help, check [DOCUMENTATION_AR.md](DOCUMENTATION_AR.md) or [README.md](README.md)
