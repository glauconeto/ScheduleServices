const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authenticateToken } = require('../middleware/auth');

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Notification Service' });
});

// Create a new notification
router.post(
    '/notifications', 
    authenticateToken,
    asyncHandler(notificationController.createNotification)
);

// Get all notifications for a user
router.get(
    '/notifications/user/:userId',
    authenticateToken,
    asyncHandler(notificationController.getUserNotifications)
);

// Get a specific notification
router.get(
    '/notifications/:id',
    authenticateToken,
    asyncHandler(notificationController.getNotification)
);

// Mark notification as read
router.patch(
    '/notifications/:id/read',
    authenticateToken,
    asyncHandler(notificationController.markAsRead)
);

// Delete a notification
router.delete(
    '/notifications/:id',
    authenticateToken,
    asyncHandler(notificationController.deleteNotification)
);

// Bulk mark notifications as read
router.patch(
    '/notifications/bulk/read',
    authenticateToken,
    asyncHandler(notificationController.markMultipleAsRead)
);

// Get unread notifications count
router.get(
    '/notifications/user/:userId/unread/count',
    authenticateToken,
    asyncHandler(notificationController.getUnreadCount)
);

// Send email notification
router.post(
    '/notifications/email',
    authenticateToken,
    asyncHandler(notificationController.sendEmailNotification)
);

// Subscribe to notification types
router.post(
    '/notifications/subscribe',
    authenticateToken,
    asyncHandler(notificationController.subscribeToNotifications)
);

// Unsubscribe from notification types
router.post(
    '/notifications/unsubscribe',
    authenticateToken,
    asyncHandler(notificationController.unsubscribeFromNotifications)
);

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
    });
};

// Export the router
module.exports = router;