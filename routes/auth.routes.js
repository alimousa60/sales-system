const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { loginValidator } = require('../middleware/validators');

const router = express.Router();

router.post('/', loginValidator, AuthController.login);

module.exports = router;
