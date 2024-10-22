const Schedule = require('../models/schedule.model');

class ScheduleService {
  async createSchedule(scheduleData) {
    try {
      const schedule = new Schedule(scheduleData);
      return await schedule.save();
    } catch (error) {
      throw new Error(`Error creating schedule: ${error.message}`);
    }
  }

  async getScheduleById(scheduleId) {
    try {
      const schedule = await Schedule.findById(scheduleId);
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new Error(`Error fetching schedule: ${error.message}`);
    }
  }

  async getUserSchedules(userId) {
    try {
      return await Schedule.find({ userId }).sort({ startTime: 1 });
    } catch (error) {
      throw new Error(`Error fetching user schedules: ${error.message}`);
    }
  }

  async updateSchedule(scheduleId, updateData) {
    try {
      const schedule = await Schedule.findByIdAndUpdate(
        scheduleId,
        updateData,
        { new: true, runValidators: true }
      );
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new Error(`Error updating schedule: ${error.message}`);
    }
  }

  async deleteSchedule(scheduleId) {
    try {
      const schedule = await Schedule.findByIdAndDelete(scheduleId);
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new Error(`Error deleting schedule: ${error.message}`);
    }
  }

  async getSchedulesByDateRange(userId, startDate, endDate) {
    try {
      return await Schedule.find({
        userId,
        startTime: { $gte: startDate },
        endTime: { $lte: endDate }
      }).sort({ startTime: 1 });
    } catch (error) {
      throw new Error(`Error fetching schedules by date range: ${error.message}`);
    }
  }
}

module.exports = new ScheduleService();