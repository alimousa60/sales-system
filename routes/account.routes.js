const express = require('express');
const AccountController = require('../controllers/account.controller');
const { requireAdmin } = require('../middleware/auth.middleware');
const { requireFields, maxLength, positiveNumber } = require('../middleware/validation');

const router = express.Router();

router.get('/', AccountController.list);

router.post('/',
  requireAdmin,
  requireFields('name'),
  maxLength('name', 100),
  positiveNumber('balance'),
  AccountController.create
);

router.patch('/:accountId',
  requireAdmin,
  maxLength('name', 100),
  positiveNumber('balance'),
  AccountController.update
);

router.delete('/:accountId',
  requireAdmin,
  AccountController.remove
);

module.exports = router;
