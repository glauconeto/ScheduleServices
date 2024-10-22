const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verifyToken);
router.get('/profile', authController.getProfile);

module.exports = router;