const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { loginValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/', loginValidator, AuthController.login);

router.get('/sessions', authenticateToken, AuthController.getSessions);
router.delete('/sessions/:sessionId', authenticateToken, AuthController.terminateSession);
router.delete('/sessions', authenticateToken, AuthController.terminateAllSessions);

module.exports = router;
