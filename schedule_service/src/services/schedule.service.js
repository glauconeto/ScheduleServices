import Schedule from '../models/schedule.model.js';

export const create = async (scheduleData) => {
  try {
    const schedule = await Schedule.create(scheduleData);
    return schedule;
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const schedules = await Schedule.findAll();
    return schedules;
  } catch (error) {
    throw error;
  }
};

export const getScheduleById = async (id) => {
  try {
    const schedules = await Schedule.findAll({
      where: { id },
      order: [['startDate', 'ASC']] // Order by start date
    });
    
    return schedules;
  } catch (error) {
    throw new Error(`Error fetching user schedules: ${error.message}`);
  }
}

export const update = async (id, scheduleData) => {
  try {
    const schedule = await Schedule.update(scheduleData, {
      where: { id },
      returning: true,
    });
    return schedule[1][0]; // Returns the updated record
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const deleted = await Schedule.destroy({
      where: { id }
    });
    return deleted;
  } catch (error) {
    throw error;
  }
};

