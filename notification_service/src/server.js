require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import { sendEmail, sendScheduleReminder, getNotificationStatus } from './controllers/notification.controller';

const app = express();
const PORT = process.env.PORT || 4003;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.post('/api/notifications/email', sendEmail);
app.post('/api/notifications/schedule-reminder', sendScheduleReminder);
app.get('/api/notifications/status', getNotificationStatus);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});