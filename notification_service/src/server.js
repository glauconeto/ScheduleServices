require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notificationController = require('./controllers/notification.controller');

const app = express();
const PORT = process.env.PORT || 4003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/notifications/email', notificationController.sendEmail);
app.post('/api/notifications/schedule-reminder', notificationController.sendScheduleReminder);
app.get('/api/notifications/status', notificationController.getNotificationStatus);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});