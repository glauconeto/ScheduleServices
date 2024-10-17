// server.js
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const { authMiddleware } = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes with their respective proxies
app.use('/api/auth', proxy('http://auth-service:4001'));
app.use('/api/schedule', authMiddleware, proxy('http://schedule-service:4002'));
app.use('/api/notifications', authMiddleware, proxy('http://notification-service:4003'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

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

// routes/index.js
const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Service status endpoint
router.get('/status', (req, res) => {
  res.json({
    services: {
      auth: 'http://auth-service:4001',
      schedule: 'http://schedule-service:4002',
      notifications: 'http://notification-service:4003'
    }
  });
});

module.exports = router;
