const CompanyService = require('../services/company.service');
const logger = require('../utils/logger');

class CompanyController {
  static async getCompany(req, res) {
    try {
      const result = await CompanyService.getCompany(req.user.companyId);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', company: result.company });
    } catch (error) {
      logger.error('خطأ في جلب بيانات الشركة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }

  static async updateCompany(req, res) {
    try {
      const result = await CompanyService.updateCompany(req.user.companyId, req.body, req.user.userId, req.user.role, req);
      if (result.error) return res.status(result.code).json({ status: 'error', message: result.error });
      res.json({ status: 'success', company: result.company });
    } catch (error) {
      logger.error('خطأ في تحديث بيانات الشركة: ' + error.message);
      res.status(500).json({ status: 'error', message: 'خطأ في الخادم' });
    }
  }
}

module.exports = CompanyController;
