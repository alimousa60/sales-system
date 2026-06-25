const express = require('express');
const TransactionController = require('../controllers/transaction.controller');
const { requireFields, positiveNumber, validEnum, VALID_TRANSACTION_TYPES, VALID_DIRECTIONS } = require('../middleware/validation');

const router = express.Router();

router.post('/',
  requireFields('type', 'amount', 'direction'),
  positiveNumber('amount'),
  validEnum('type', VALID_TRANSACTION_TYPES),
  validEnum('direction', VALID_DIRECTIONS),
  TransactionController.create
);

router.get('/', TransactionController.list);

router.get('/:transactionId', TransactionController.getById);

router.patch('/:transactionId',
  validEnum('status', ['pending', 'completed', 'failed', 'reconciled']),
  TransactionController.update
);

router.post('/:transactionId/reconcile', TransactionController.reconcile);

router.post('/receive',
  requireFields('amount'),
  positiveNumber('amount'),
  TransactionController.receivePayment
);

router.post('/send',
  requireFields('amount'),
  positiveNumber('amount'),
  TransactionController.sendPayment
);

module.exports = router;
