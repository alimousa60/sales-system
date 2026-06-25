const express = require('express');
const AdminController = require('../controllers/admin.controller');
const { maxLength, validRole, validEmail, validEnum } = require('../middleware/validation');

const VALID_USER_STATUSES = ['active', 'inactive', 'suspended'];

const router = express.Router();

router.get('/users', AdminController.listUsers);

router.put('/users/:userId',
  maxLength('name', 100),
  validEmail,
  validRole,
  validEnum('status', VALID_USER_STATUSES),
  AdminController.updateUser
);

router.delete('/users/:userId', AdminController.deleteUser);

router.get('/audit-logs', AdminController.getAuditLogs);

module.exports = router;
