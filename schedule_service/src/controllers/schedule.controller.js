// src/controllers/schedule.controller.js
const scheduleService = require('../services/schedule.service');
const { validationResult } = require('express-validator');

class ScheduleController {
  async createSchedule(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const schedule = await scheduleService.createSchedule(req.body);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSchedules(req, res) {
    try {
      const schedules = await scheduleService.getSchedules(req.query);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateSchedule(req, res) {
    try {
      const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteSchedule(req, res) {
    try {
      const schedule = await scheduleService.deleteSchedule(req.params.id);
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ScheduleController();