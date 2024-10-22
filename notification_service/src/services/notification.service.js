const nodemailer = require('nodemailer');
const emailTemplates = require('../templates/email_templates');
const handlebars = require('handlebars');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    this.reminderQueue = new Map();
  }

  async sendEmail(to, subject, templateName, data) {
    try {
      // Get template
      const template = emailTemplates[templateName];
      if (!template) {
        throw new Error('Email template not found');
      }

      // Compile template
      const compiledTemplate = handlebars.compile(template);
      const html = compiledTemplate(data);

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Send email error:', error);
      throw error;
    }
  }

  async scheduleReminder(userId, scheduleId, reminderTime) {
    try {
      const reminder = {
        userId,
        scheduleId,
        reminderTime: new Date(reminderTime),
        status: 'pending'
      };

      const reminderId = `${userId}-${scheduleId}-${Date.now()}`;
      this.reminderQueue.set(reminderId, reminder);

      // Schedule the reminder
      const timeUntilReminder = reminder.reminderTime - new Date();
      if (timeUntilReminder > 0) {
        setTimeout(async () => {
          try {
            await this.sendScheduleReminderEmail(userId, scheduleId);
            this.reminderQueue.get(reminderId).status = 'sent';
          } catch (error) {
            console.error('Reminder send error:', error);
            this.reminderQueue.get(reminderId).status = 'failed';
          }
        }, timeUntilReminder);
      }

      return reminderId;
    } catch (error) {
      console.error('Schedule reminder error:', error);
      throw error;
    }
  }

  async sendScheduleReminderEmail(userId, scheduleId) {
    // Implementation would typically fetch user and schedule details from respective services
    // For now, we'll use a placeholder implementation
    await this.sendEmail(
      'user@example.com',
      'Schedule Reminder',
      'scheduleReminder',
      {
        scheduleId,
        // Additional data would be fetched from schedule service
      }
    );
  }

  async getServiceStatus() {
    return {
      service: 'notification-service',
      status: 'healthy',
      pendingReminders: this.reminderQueue.size,
      emailService: await this.checkEmailService()
    };
  }

  async checkEmailService() {
    try {
      await this.transporter.verify();
      return 'connected';
    } catch (error) {
      return 'disconnected';
    }
  }
}

module.exports = NotificationService;