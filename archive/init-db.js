/**
 * سكريبت تهيئة البيانات الأولية
 * استخدم: node init-db.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sales-system';

// Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
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

const User = mongoose.model('User', userSchema);
const Company = mongoose.model('Company', companySchema);

async function initializeDB() {
  try {
    console.log('🔄 جاري الاتصال بـ MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✓ متصل بـ MongoDB بنجاح');

    // حذف البيانات القديمة (اختياري)
    // await User.deleteMany({});
    // await Company.deleteMany({});

    // التحقق من وجود شركة
    let company = await Company.findOne({ name: 'المؤسسة التجارية' });
    
    if (!company) {
      console.log('📝 إنشاء شركة جديدة...');
      company = await Company.create({
        name: 'المؤسسة التجارية',
        address: 'طرابلس، ليبيا',
        phone: '+218 21 3604321',
        email: 'info@company.ly',
        taxNumber: 'TAX123456',
        note: 'الشركة الرئيسية'
      });
      console.log('✓ تم إنشاء الشركة');
    }

    // التحقق من وجود مسؤول
    let admin = await User.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('📝 إنشاء حساب المسؤول...');
      const passwordHash = await bcrypt.hash('admin123', 10);
      admin = await User.create({
        username: 'admin',
        passwordHash,
        name: 'مدير النظام',
        email: 'admin@company.ly',
        role: 'admin',
        companyId: company._id,
        isActive: true
      });
      console.log('✓ تم إنشاء حساب المسؤول');
      console.log(`   البيانات: admin / admin123`);
    }

    // إنشاء مستخدم تجريبي
    let testUser = await User.findOne({ username: 'user1' });
    
    if (!testUser) {
      console.log('📝 إنشاء مستخدم تجريبي...');
      const passwordHash = await bcrypt.hash('user123', 10);
      testUser = await User.create({
        username: 'user1',
        passwordHash,
        name: 'محمد علي',
        email: 'user1@company.ly',
        role: 'user',
        companyId: company._id,
        createdBy: admin._id,
        isActive: true
      });
      console.log('✓ تم إنشاء المستخدم التجريبي');
      console.log(`   البيانات: user1 / user123`);
    }

    console.log('\n✅ اكتملت عملية التهيئة بنجاح!');
    console.log('\n📊 الملخص:');
    console.log(`   • الشركة: ${company.name}`);
    console.log(`   • المسؤول: admin (admin123)`);
    console.log(`   • المستخدم التجريبي: user1 (user123)`);

    await mongoose.connection.close();
    console.log('\n✓ تم قطع الاتصال بـ MongoDB');

  } catch (error) {
    console.error('❌ خطأ:', error.message);
    process.exit(1);
  }
}

initializeDB();
