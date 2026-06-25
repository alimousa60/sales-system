const Company = require('../models/company.model');
const AuthService = require('./auth.service');
const logger = require('../utils/logger');

class CompanyService {
  static async getCompany(companyId) {
    const company = await Company.findById(companyId);
    if (!company) return { error: 'الشركة غير موجودة', code: 404 };
    return { company };
  }

  static async updateCompany(companyId, updates, userId, userRole, req) {
    const allowedUpdates = ['name', 'logo', 'address', 'phone', 'email', 'taxNumber', 'note', 'industry', 'country', 'timezone', 'status'];
    const filtered = {};
    allowedUpdates.forEach((field) => { if (field in updates) filtered[field] = updates[field]; });
    if (Object.keys(filtered).length === 0) return { error: 'لا توجد بيانات صالحة للتحديث', code: 400 };

    const company = await Company.findById(companyId);
    if (!company) return { error: 'الشركة غير موجودة', code: 404 };

    if (company.owner?.toString() !== userId && userRole !== 'admin' && userRole !== 'system_admin') {
      return { error: 'ممنوع: مطلوب صلاحيات تحديث الشركة', code: 403 };
    }

    filtered.updatedAt = new Date();
    const updatedCompany = await Company.findByIdAndUpdate(companyId, filtered, { new: true, runValidators: true });
    await AuthService.logAudit(userId, 'UPDATE_COMPANY', 'Company', updatedCompany._id.toString(), filtered, req);
    return { company: updatedCompany };
  }
}

module.exports = CompanyService;
