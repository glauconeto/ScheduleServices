import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = Router();

// Define service URLs
const SCHEDULE_SERVICE_URL = 'http://schedule-service:4001';
const AUTH_SERVICE_URL = 'http://auth-service:4002';
const NOTIFICATION_SERVICE_URL = 'http://notification-service:4003';

// Proxy endpoints
router.use('/schedules', createProxyMiddleware({ target: SCHEDULE_SERVICE_URL, changeOrigin: true }));
router.use('/auth', createProxyMiddleware({ target: AUTH_SERVICE_URL, changeOrigin: true }));
router.use('/notifications', createProxyMiddleware({ target: NOTIFICATION_SERVICE_URL, changeOrigin: true }));

export default router;
