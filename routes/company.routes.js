/**
 * Company Management Routes
 * POST, GET, PATCH companies
 * Manage company members and settings
 */

const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();
const Company = require('../models/company.model');
const User = require('../models/user.model');
const { authenticateToken } = require('../middleware/rbac.middleware');
const DataIsolationService = require('../services/dataIsolation.service');

/**
 * GET /api/v1/companies
 * List all companies user belongs to
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;

    // Find companies where user is owner or member
    const companies = await Company.find({
      $or: [
        { owner: userId },
        { 'members.userId': userId }
      ]
    })
      .select('_id name code owner status plan memberCount createdAt')
      .populate('owner', 'name email');

    return res.json({
      success: true,
      data: companies,
      count: companies.length
    });
  } catch (error) {
    logger.error('Get companies error: ' + error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch companies' 
    });
  }
});

/**
 * GET /api/v1/companies/:companyId
 * Get company details (must be member/owner)
 */
router.get('/:companyId', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const userId = req.user?.userId || req.user?._id;

    const company = await Company.findById(companyId)
      .populate('owner', 'name email')
      .populate('members.userId', 'name email role status')
      .populate('createdBy', 'name email');

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check access
    await DataIsolationService.verifyCompanyAccess(userId, companyId);

    return res.json({
      success: true,
      data: company
    });
  } catch (error) {
    if (error.message.includes('not a member')) {
      return res.status(403).json({ error: 'Access denied' });
    }
    logger.error('Get company error: ' + error.message);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

/**
 * POST /api/v1/companies
 * Create new company (SuperUser/Admin only)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, code, maxUsers, industry, country } = req.body;
    const userId = req.user?.userId || req.user?._id;

    if (req.user?.role !== 'system_admin') {
      return res.status(403).json({
        error: 'Only system admins can create companies'
      });
    }

    // Validate input
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    // Enforce one user -> one company only
    const existingMembership = await Company.findOne({
      $or: [
        { owner: userId },
        { 'members.userId': userId }
      ]
    });

    if (existingMembership) {
      return res.status(400).json({
        error: 'This user already belongs to another company'
      });
    }

    // Check if code already exists
    const existing = await Company.findOne({ code });
    if (existing) {
      return res.status(400).json({ error: 'Company code already exists' });
    }

    // Create company
    const company = await Company.create({
      name,
      code: code.toUpperCase(),
      owner: userId,
      maxUsers: maxUsers || 100,
      industry,
      country,
      members: [{
        userId: userId,
        role: 'owner',
        status: 'active'
      }],
      createdBy: userId
    });

    // Keep user-company relation in sync
    await User.findByIdAndUpdate(
      userId,
      {
        companyId: company._id,
        updatedAt: new Date()
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: company
    });
  } catch (error) {
    logger.error('Create company error: ' + error.message);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

/**
 * PATCH /api/v1/companies/:companyId
 * Update company (owner/admin only)
 */
router.patch('/:companyId', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const userId = req.user?.userId || req.user?._id;
    const updates = req.body;

    // Verify access
    const company = await DataIsolationService.verifyCompanyAccess(userId, companyId);

    // Check if user is owner or admin
    const member = company.members.find(m => m.userId?.toString() === userId.toString());
    if (company.owner?.toString() !== userId.toString() && member?.role !== 'admin') {
      return res.status(403).json({ error: 'Only owner or admin can update company' });
    }

    // Allowed updates
    const allowedUpdates = ['name', 'industry', 'country', 'timezone', 'maxUsers', 'maxDepartments', 'status'];
    const filteredUpdates = {};
    
    allowedUpdates.forEach(key => {
      if (key in updates) filteredUpdates[key] = updates[key];
    });

    filteredUpdates.lastModifiedBy = userId;
    filteredUpdates.updatedAt = new Date();

    const updated = await Company.findByIdAndUpdate(
      companyId,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    return res.json({
      success: true,
      message: 'Company updated successfully',
      data: updated
    });
  } catch (error) {
    logger.error('Update company error: ' + error.message);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

/**
 * POST /api/v1/companies/:companyId/members
 * Add member to company
 */
router.post('/:companyId/members', authenticateToken, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { userId: targetUserId, role = 'member' } = req.body;
    const userId = req.user?.userId || req.user?._id;

    if (req.user?.role !== 'system_admin') {
      return res.status(403).json({
        error: 'Only system admins can add users to companies'
      });
    }

    if (!targetUserId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Verify access
    const company = await DataIsolationService.verifyCompanyAccess(userId, companyId);

    // Check if requester is owner or admin
    const requesterMember = company.members.find(m => m.userId?.toString() === userId.toString());
    if (company.owner?.toString() !== userId.toString() && requesterMember?.role !== 'admin') {
      return res.status(403).json({ error: 'Only owner or admin can add members' });
    }

    // Check if user exists and belongs to same company
    const newMember = await User.findById(targetUserId);
    if (!newMember) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Enforce one user -> one company only
    const alreadyInAnotherCompany = newMember.companyId &&
      newMember.companyId.toString() !== companyId.toString();
    if (alreadyInAnotherCompany) {
      return res.status(400).json({
        error: 'User already belongs to another company'
      });
    }

    // Check if user already exists
    const alreadyMember = company.members.find(m => m.userId?.toString() === targetUserId);
    if (alreadyMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    // Check member limit
    if (company.members.length >= company.maxUsers) {
      return res.status(400).json({ error: 'Company member limit reached' });
    }

    // Add member
    company.members.push({
      userId: targetUserId,
      role,
      status: 'active',
      joinedAt: new Date(),
      invitedBy: userId
    });

    await company.save();

    // Keep user-company relation in sync
    await User.findByIdAndUpdate(
      targetUserId,
      {
        companyId: companyId,
        updatedAt: new Date()
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: 'Member added successfully',
      data: company
    });
  } catch (error) {
    logger.error('Add member error: ' + error.message);
    res.status(500).json({ error: 'Failed to add member' });
  }
});

/**
 * DELETE /api/v1/companies/:companyId/members/:userId
 * Remove user from company
 */
router.delete('/:companyId/members/:userId', authenticateToken, async (req, res) => {
  try {
    const { companyId, userId: memberUserId } = req.params;
    const userId = req.user?.userId || req.user?._id;

    // Verify access
    const company = await DataIsolationService.verifyCompanyAccess(userId, companyId);

    // Check if requester is owner
    if (company.owner?.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Only owner can remove members' });
    }

    // Remove member
    company.members = company.members.filter(m => m.userId?.toString() !== memberUserId);
    await company.save();

    return res.json({
      success: true,
      message: 'Member removed successfully',
      data: company
    });
  } catch (error) {
    logger.error('Remove member error: ' + error.message);
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

/**
 * GET /api/v1/companies/:companyId/invoice-template
 * Get invoice template settings
 */
router.get('/:companyId/invoice-template', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { companyId } = req.params;
    const company = await DataIsolationService.verifyCompanyAccess(userId, companyId);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    return res.json({ success: true, data: company.invoiceTemplate || {} });
  } catch (error) {
    logger.error('Get invoice template error: ' + error.message);
    res.status(500).json({ error: 'Failed to fetch invoice template' });
  }
});

/**
 * PUT /api/v1/companies/:companyId/invoice-template
 * Update invoice template settings
 */
router.put('/:companyId/invoice-template', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const { companyId } = req.params;
    const company = await DataIsolationService.verifyCompanyAccess(userId, companyId);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    const member = company.members.find(m => m.userId?.toString() === userId.toString());
    if (company.owner?.toString() !== userId.toString() && member?.role !== 'admin') {
      return res.status(403).json({ error: 'Only owner or admin can update settings' });
    }
    company.invoiceTemplate = { ...company.invoiceTemplate, ...req.body };
    await company.save();
    return res.json({ success: true, message: 'Invoice template updated', data: company.invoiceTemplate });
  } catch (error) {
    logger.error('Update invoice template error: ' + error.message);
    res.status(500).json({ error: 'Failed to update invoice template' });
  }
});

module.exports = router;
