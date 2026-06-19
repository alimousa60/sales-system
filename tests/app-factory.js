const express = require('express');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../middleware/errorHandler');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'غير مصرح' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ status: 'error', message: 'بطاقة مرور غير صحيحة' });
    req.user = { userId: payload.userId, role: payload.role, username: payload.username, companyId: payload.companyId };
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!['admin', 'system_admin'].includes(req.user?.role)) {
    return res.status(403).json({ status: 'error', message: 'ممنوع' });
  }
  next();
}

function createApp() {
  const app = express();
  app.use(express.json());

  const authRoutes = require('../routes/auth.routes');
  const usersRoutes = require('../routes/users.routes');
  const accountRoutes = require('../routes/account.routes');
  const transactionRoutes = require('../routes/transaction.routes');

  app.use('/api/v1/auth/login', authRoutes);
  app.use('/api/v1/users', authenticateToken, usersRoutes);
  app.use('/api/v1/accounts', authenticateToken, accountRoutes);
  app.use('/api/v1/transactions', authenticateToken, transactionRoutes);

  app.use(errorHandler);
  return app;
}

module.exports = { createApp, authenticateToken, requireAdmin };
