const { Op } = require('sequelize');
const Schedule = require('../models/schedule.model');

class ScheduleService {
  async createSchedule(scheduleData) {
    try {
      return await Schedule.create(scheduleData);
    } catch (error) {
      throw new Error(`Error creating schedule: ${error.message}`);
    }
  }

  async getScheduleById(scheduleId) {
    try {
      const schedule = await Schedule.findByPk(scheduleId);
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
      return await Schedule.findAll({
        where: { userId },
        order: [['startTime', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Error fetching user schedules: ${error.message}`);
    }
  }

  async updateSchedule(scheduleId, updateData) {
    try {
      const [updatedRowsCount, updatedSchedules] = await Schedule.update(
        updateData,
        {
          where: { id: scheduleId },
          returning: true
        }
      );

      if (updatedRowsCount === 0) {
        throw new Error('Schedule not found');
      }

      return updatedSchedules[0];
    } catch (error) {
      throw new Error(`Error updating schedule: ${error.message}`);
    }
  }

  async deleteSchedule(scheduleId) {
    try {
      const deletedCount = await Schedule.destroy({
        where: { id: scheduleId }
      });

      if (deletedCount === 0) {
        throw new Error('Schedule not found');
      }

      return true;
    } catch (error) {
      throw new Error(`Error deleting schedule: ${error.message}`);
    }
  }

  async getSchedulesByDateRange(userId, startDate, endDate) {
    try {
      return await Schedule.findAll({
        where: {
          userId,
          startTime: {
            [Op.gte]: startDate
          },
          endTime: {
            [Op.lte]: endDate
          }
        },
        order: [['startTime', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Error fetching schedules by date range: ${error.message}`);
    }
  }
}

module.exports = new ScheduleService();