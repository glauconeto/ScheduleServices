// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token with auth service
    try {
      const response = await axios.post('http://auth-service:4001/api/auth/verify', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      req.user = response.data.user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authMiddleware };
