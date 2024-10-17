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
