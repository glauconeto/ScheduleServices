import { Router } from 'express';
import { createSchedule, getScheduleById, getUserSchedules, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js';

// src/routes/schedule.routes.js
const router = Router();

// Create a new schedule
router.post('/', createSchedule);
// Get a specific schedule
router.get('/:id', getScheduleById);
// Get all schedules for a user
router.get('/user/:userId', getUserSchedules);
// Update a schedule
router.put('/:id', updateSchedule);
// Delete a schedule
router.delete('/:id', deleteSchedule);

export default router;