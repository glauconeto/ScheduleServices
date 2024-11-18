import { create, getAll, update, remove } from '../services/schedule.service.js';

export const createSchedule = async (req, res) => {
  try {
    const schedule = await create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const schedules = await getAll();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format if it's a UUID
    if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const schedule = await scheduleService.getScheduleById(id);
    
    return res.status(200).json({
      success: true,
      data: schedule,
      message: 'Schedule retrieved successfully'
    });

  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error retrieving schedule',
      error: error.message
    });
  }
}

export const getUserSchedules = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format if it's a UUID
    if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const schedules = await scheduleService.getUserSchedules(userId);

    // If no schedules found, return empty array with 200 status
    if (!schedules || schedules.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No schedules found for this user'
      });
    }

    return res.status(200).json({
      success: true,
      data: schedules,
      message: 'User schedules retrieved successfully'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving user schedules',
      error: error.message
    });
  }
}

export const updateSchedule = async (req, res) => {
  try {
    const schedule = await update(req.params.id, req.body);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const deleted = await remove(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};