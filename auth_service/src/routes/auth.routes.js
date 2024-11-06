import express from 'express';
import { register, login, validateToken, authenticateToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', validateToken);

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
});

export default router;