import NotificationService from '../services/notification.service';
import { query } from '../config/database.js';
import nodemailer from 'nodemailer';

const notificationService = new NotificationService();

// Create a new notification
export const createNotification = async (req, res) => {
  const { userId, title, message, type } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO notifications (user_id, title, message, type, read, created_at) VALUES ($1, $2, $3, $4, false, NOW()) RETURNING *',
      [userId, title, message, type]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    const result = await query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );
    
    const totalCount = await query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1',
      [userId]
    );
    
    res.status(200).json({
      notifications: result.rows,
      total: parseInt(totalCount.rows[0].count),
      currentPage: parseInt(page),
      totalPages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Get a specific notification
export const getNotification = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await query(
      'SELECT * FROM notifications WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notification' });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await query(
      'UPDATE notifications SET read = true, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await query(
      'DELETE FROM notifications WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};

// Mark multiple notifications as read
export const markMultipleAsRead = async (req, res) => {
  const { notificationIds } = req.body;
  
  try {
    const result = await query(
      'UPDATE notifications SET read = true, updated_at = NOW() WHERE id = ANY($1) RETURNING *',
      [notificationIds]
    );
    
    res.status(200).json({
      message: `${result.rowCount} notifications marked as read`,
      notifications: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
};

// Get unread notifications count
export const getUnreadCount = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const result = await query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND read = false',
      [userId]
    );
    
    res.status(200).json({
      unreadCount: parseInt(result.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
};

// Send email notification
export const sendEmailNotification = async (req, res) => {
  const { email, subject, message } = req.body;
  
  // Configure nodemailer (replace with your email service credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email notification' });
  }
};

// Subscribe to notifications
export const subscribeToNotifications = async (req, res) => {
  const { userId, notificationTypes } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO notification_preferences (user_id, notification_types) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET notification_types = $2 RETURNING *',
      [userId, notificationTypes]
    );
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification preferences' });
  }
};

// Unsubscribe from notifications
export const unsubscribeFromNotifications = async (req, res) => {
  const { userId, notificationTypes } = req.body;
  
  try {
    const currentPreferences = await query(
      'SELECT notification_types FROM notification_preferences WHERE user_id = $1',
      [userId]
    );
    
    if (currentPreferences.rows.length === 0) {
      return res.status(404).json({ error: 'No notification preferences found' });
    }
    
    const updatedTypes = currentPreferences.rows[0].notification_types.filter(
      type => !notificationTypes.includes(type)
    );
    
    const result = await query(
      'UPDATE notification_preferences SET notification_types = $2 WHERE user_id = $1 RETURNING *',
      [userId, updatedTypes]
    );
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification preferences' });
  }
};