import NotificationService from '../services/notification.service';

describe('Notification Service Tests', () => {
  let notificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
  });

  describe('sendEmail', () => {
    it('deve enviar email com sucesso', async () => {
      const mockEmail = {
        to: 'test@example.com',
        subject: 'Test Notification',
        body: 'This is a test notification'
      };

      const result = await notificationService.sendEmail(mockEmail);
      expect(result.success).toBe(true);
      expect(result).toHaveProperty('messageId');
    });

    it('deve lidar com falhas no envio de email', async () => {
      const mockEmail = {
        to: 'invalid-email',
        subject: 'Test Notification',
        body: 'This is a test notification'
      };

      await expect(notificationService.sendEmail(mockEmail))
        .rejects
        .toThrow();
    });
  });

  describe('createNotificationTemplate', () => {
    it('deve criar template de notificação corretamente', () => {
      const template = notificationService.createNotificationTemplate({
        type: 'appointment_reminder',
        data: {
          name: 'Test User',
          date: '2025-02-01T10:00:00',
          service: 'Consulta Médica'
        }
      });

      expect(template).toContain('Test User');
      expect(template).toContain('Consulta Médica');
    });
  });
});