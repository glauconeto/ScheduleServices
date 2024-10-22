const NotificationService = require('../services/notification.service');
const notificationService = new NotificationService();

class NotificationController {
  async sendEmail(req, res) {
    try {
      const { to, subject, templateName, data } = req.body;
      await notificationService.sendEmail(to, subject, templateName, data);
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Send email error:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  }

  async sendScheduleReminder(req, res) {
    try {
      const { userId, scheduleId, reminderTime } = req.body;
      await notificationService.scheduleReminder(userId, scheduleId, reminderTime);
      res.json({ message: 'Reminder scheduled successfully' });
    } catch (error) {
      console.error('Schedule reminder error:', error);
      res.status(500).json({ message: 'Failed to schedule reminder' });
    }
  }

  async getNotificationStatus(req, res) {
    try {
      const status = await notificationService.getServiceStatus();
      res.json(status);
    } catch (error) {
      console.error('Status check error:', error);
      res.status(500).json({ message: 'Failed to get service status' });
    }
  }
}

module.exports = new NotificationController();