import { Router } from 'express';
import { createNotification, getUserNotifications, getNotification, markAsRead, deleteNotification, markMultipleAsRead, getUnreadCount, sendEmailNotification, subscribeToNotifications, unsubscribeFromNotifications } from '../controllers/notification.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Notification Service' });
});

// Create a new notification
router.post(
    '/notifications',
    authenticateToken,
    asyncHandler(createNotification)
);

// Get all notifications for a user
router.get(
    '/notifications/user/:userId',
    authenticateToken,
    asyncHandler(getUserNotifications)
);

// Get a specific notification
router.get(
    '/notifications/:id',
    authenticateToken,
    asyncHandler(getNotification)
);

// Mark notification as read
router.patch(
    '/notifications/:id/read',
    authenticateToken,
    asyncHandler(markAsRead)
);

// Delete a notification
router.delete(
    '/notifications/:id',
    authenticateToken,
    asyncHandler(deleteNotification)
);

// Bulk mark notifications as read
router.patch(
    '/notifications/bulk/read',
    authenticateToken,
    asyncHandler(markMultipleAsRead)
);

// Get unread notifications count
router.get(
    '/notifications/user/:userId/unread/count',
    authenticateToken,
    asyncHandler(getUnreadCount)
);

// Send email notification
router.post(
    '/notifications/email',
    authenticateToken,
    asyncHandler(sendEmailNotification)
);

// Subscribe to notification types
router.post(
    '/notifications/subscribe',
    authenticateToken,
    asyncHandler(subscribeToNotifications)
);

// Unsubscribe from notification types
router.post(
    '/notifications/unsubscribe',
    authenticateToken,
    asyncHandler(unsubscribeFromNotifications)
);

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
    });
};

// Export the router
export default router;