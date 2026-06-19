/**
 * Data Isolation Service - Business logic for data access control
 * Handles company, department, and user data operations
 */

const Company = require('../models/company.model');
const Department = require('../models/department.model');
const DataSharing = require('../models/dataSharing.model');

class DataIsolationService {
  /**
   * Verify user belongs to company
   */
  static async verifyCompanyAccess(userId, companyId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      const isMember = company.members.some(m => m.userId?.toString() === userId);
      if (!isMember && company.owner?.toString() !== userId) {
        throw new Error('User is not a member of this company');
      }

      return company;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify user has access to department
   */
  static async verifyDepartmentAccess(userId, departmentId) {
    try {
      const dept = await Department.findById(departmentId);
      if (!dept) {
        throw new Error('Department not found');
      }

      const isMember = dept.members.some(m => m.userId?.toString() === userId);
      const isManager = dept.manager?.toString() === userId;

      // User must be member OR manager
      if (!isMember && !isManager) {
        throw new Error('User does not have access to this department');
      }

      return dept;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Share resource with user(s)
   */
  static async shareResource(sharingData) {
    try {
      const {
        resourceId,
        resourceType,
        sharedBy,
        sharedWith,
        permission = 'read',
        expiresAt = null,
        reason = '',
        companyId,
        departmentId
      } = sharingData;

      // Create sharing record
      const sharing = await DataSharing.create({
        resourceId,
        resourceType,
        sharedBy,
        sharedWith: sharedWith.map(userId => ({
          userId,
          permission,
          expiresAt
        })),
        reason,
        companyId,
        departmentId,
        status: 'approved',
        approvedBy: sharedBy,
        approvedAt: new Date()
      });

      return sharing;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get resources shared with user
   */
  static async getSharedWithMe(userId, filters = {}) {
    try {
      const query = {
        'sharedWith.userId': userId,
        'sharedWith.isActive': true,
        status: 'approved'
      };

      if (filters.resourceType) {
        query.resourceType = filters.resourceType;
      }

      if (filters.permission) {
        query['sharedWith.permission'] = filters.permission;
      }

      const shares = await DataSharing.find(query)
        .populate('sharedBy', 'name email')
        .sort({ createdAt: -1 });

      return shares;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Revoke share
   */
  static async revokeShare(shareId, revokedBy, reason) {
    try {
      const share = await DataSharing.findById(shareId);
      if (!share) throw new Error('Share not found');

      // Verify revoker is owner
      if (share.sharedBy?.toString() !== revokedBy.toString()) {
        throw new Error('Only the sharer can revoke');
      }

      share.status = 'revoked';
      share.revokedBy = revokedBy;
      share.revokedAt = new Date();
      share.revocationReason = reason;

      await share.save();
      return share;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DataIsolationService;
