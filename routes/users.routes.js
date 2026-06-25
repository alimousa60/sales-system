const express = require('express');
const UserController = require('../controllers/user.controller');
const { requireAdmin } = require('../middleware/auth.middleware');
const { requireFields, maxLength, strongPassword, validEmail, validRole, sanitizeBody, validEnum } = require('../middleware/validation');

const VALID_USER_STATUSES = ['active', 'inactive', 'suspended'];

const router = express.Router();

router.get('/', UserController.list);

router.post('/',
  requireAdmin,
  sanitizeBody(),
  requireFields('username', 'password', 'name'),
  maxLength('username', 50),
  maxLength('name', 100),
  maxLength('password', 128),
  strongPassword,
  validEmail,
  validRole,
  UserController.create
);

router.get('/:userId', UserController.getById);

router.patch('/:userId/role',
  requireAdmin,
  requireFields('roleId'),
  UserController.updateRole
);

router.patch('/:userId/status',
  requireAdmin,
  requireFields('status'),
  validEnum('status', VALID_USER_STATUSES),
  UserController.updateStatus
);

module.exports = router;
