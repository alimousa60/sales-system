/**
 * RBAC Models - Role-Based Access Control
 * نماذج للتحكم في الوصول بناءً على الأدوار
 * 
 * هندسة معمارية نظيفة تتبع SOLID Principles
 */

const mongoose = require('mongoose');

// ============= ROLE SCHEMA =============

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['SuperUser', 'Admin', 'Manager', 'Employee', 'Viewer'],
    index: true
  },
  
  description: {
    type: String,
    required: true
  },
  
  hierarchy: {
    type: Number,
    required: true,
    // SuperUser=1, Admin=2, Manager=3, Employee=4, Viewer=5
    index: true
  },
  
  // صلاحيات الدور - grouped by resource
  permissions: [
    {
      resource: {
        type: String,
        enum: ['transactions', 'inventory', 'users', 'analytics', 'reports', 'settings', 'audit', 'hrm', 'hrm_payroll', 'hrm_performance'],
        required: true
      },
      
      // الإجراءات المسموحة
      actions: {
        type: [String],
        enum: ['create', 'read', 'update', 'delete', 'export', 'approve', 'pay'],
        default: ['read']
      },
      
      // قيود إضافية على الصلاحية
      constraints: {
        // هل يقتصر على بيانات المستخدم نفسه؟
        ownDataOnly: {
          type: Boolean,
          default: false
        },
        
        // هل يقتصر على قسم المستخدم؟
        departmentOnly: {
          type: Boolean,
          default: false
        },
        
        // هل يقتصر على شركة المستخدم؟
        companyOnly: {
          type: Boolean,
          default: true
        },
        
        // حقول إضافية مخصصة
        customConstraints: mongoose.Schema.Types.Mixed
      }
    }
  ],
  
  // هل الدور قابل للتعديل؟
  isSystemRole: {
    type: Boolean,
    default: true
  },
  
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'roles'
});

// ============= MODELS EXPORT =============

// نحتاج إلى التحقق من أن الـ models لم تُعرّف مسبقاً
let Role;

try {
  Role = mongoose.model('Role', roleSchema);
} catch (err) {
  Role = mongoose.model('Role');
}

module.exports = {
  roleSchema,
  Role
};
