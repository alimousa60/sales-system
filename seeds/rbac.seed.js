/**
 * RBAC Seed Data - Seed Roles with Permissions
 * يقوم بإنشاء الأدوار والصلاحيات الافتراضية في قاعدة البيانات
 */

const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
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

const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema);

const seedRoleData = [
  {
    name: 'SuperUser',
    description: 'مشرف نظام - وصول كامل لا محدود',
    hierarchy: 1,
    isSystemRole: true,
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'], constraints: { companyOnly: false } },
      { resource: 'transactions', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: false } },
      { resource: 'inventory', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: false } },
      { resource: 'analytics', actions: ['read', 'export'], constraints: { companyOnly: false } },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: false } },
      { resource: 'settings', actions: ['read', 'update'], constraints: { companyOnly: false } },
      { resource: 'audit', actions: ['read'], constraints: { companyOnly: false } }
    ]
  },
  {
    name: 'Admin',
    description: 'إدارة النظام - وصول كامل داخل الشركة',
    hierarchy: 2,
    isSystemRole: true,
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'], constraints: { companyOnly: true } },
      { resource: 'transactions', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: true } },
      { resource: 'inventory', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: true } },
      { resource: 'analytics', actions: ['read', 'export'], constraints: { companyOnly: true } },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: true } },
      { resource: 'settings', actions: ['read', 'update'], constraints: { companyOnly: true } },
      { resource: 'audit', actions: ['read'], constraints: { companyOnly: true } },
      { resource: 'hrm', actions: ['create', 'read', 'update', 'delete', 'export'], constraints: { companyOnly: true } },
      { resource: 'hrm_payroll', actions: ['create', 'read', 'update', 'approve', 'pay', 'export'], constraints: { companyOnly: true } },
      { resource: 'hrm_performance', actions: ['create', 'read', 'update', 'export'], constraints: { companyOnly: true } }
    ]
  },
  {
    name: 'Manager',
    description: 'مدير - وصول محدود مع إدارة الموظفين',
    hierarchy: 3,
    isSystemRole: true,
    permissions: [
      { resource: 'users', actions: ['read', 'update'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'transactions', actions: ['create', 'read', 'update', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'inventory', actions: ['create', 'read', 'update', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'analytics', actions: ['read', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'reports', actions: ['create', 'read', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'audit', actions: ['read'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'hrm', actions: ['create', 'read', 'update', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'hrm_payroll', actions: ['read', 'export'], constraints: { companyOnly: true, departmentOnly: true } },
      { resource: 'hrm_performance', actions: ['create', 'read', 'export'], constraints: { companyOnly: true, departmentOnly: true } }
    ]
  },
  {
    name: 'Employee',
    description: 'موظف - وصول محدود للبيانات الأساسية',
    hierarchy: 4,
    isSystemRole: true,
    permissions: [
      { resource: 'transactions', actions: ['create', 'read'], constraints: { companyOnly: true, ownDataOnly: true } },
      { resource: 'inventory', actions: ['read'], constraints: { companyOnly: true } },
      { resource: 'analytics', actions: ['read'], constraints: { companyOnly: true, ownDataOnly: true } },
      { resource: 'hrm', actions: ['read'], constraints: { companyOnly: true, ownDataOnly: true } },
      { resource: 'hrm_performance', actions: ['read'], constraints: { companyOnly: true, ownDataOnly: true } }
    ]
  },
  {
    name: 'Viewer',
    description: 'مشاهد - وصول للقراءة فقط',
    hierarchy: 5,
    isSystemRole: true,
    permissions: [
      { resource: 'transactions', actions: ['read'], constraints: { companyOnly: true } },
      { resource: 'inventory', actions: ['read'], constraints: { companyOnly: true } },
      { resource: 'analytics', actions: ['read'], constraints: { companyOnly: true } },
      { resource: 'reports', actions: ['read'], constraints: { companyOnly: true } }
    ]
  }
];

async function seedRBACRoles() {
  const results = [];
  for (const roleData of seedRoleData) {
    const existing = await Role.findOne({ name: roleData.name });
    if (existing) {
      await Role.updateOne({ _id: existing._id }, { $set: { permissions: roleData.permissions, hierarchy: roleData.hierarchy, description: roleData.description } });
      results.push(`✓ ${roleData.name} — محدَّث`);
    } else {
      await Role.create(roleData);
      results.push(`✓ ${roleData.name} — منشأ`);
    }
  }
  return results;
}

module.exports = { seedRBACRoles };
