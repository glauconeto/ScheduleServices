const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

// Create a new schedule
router.post('/', scheduleController.createSchedule);

// Get a specific schedule
router.get('/:id', scheduleController.getSchedule);

// Get all schedules for a user
router.get('/user/:userId', scheduleController.getUserSchedules);

// Get schedules by date range
router.get('/range', scheduleController.getSchedulesByDateRange);

// Update a schedule
router.put('/:id', scheduleController.updateSchedule);

// Delete a schedule
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;