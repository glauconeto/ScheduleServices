// src/models/schedule.model.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['CONSULTATION', 'FOLLOW_UP', 'EXAMINATION'],
    default: 'CONSULTATION'
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);

// src/services/schedule.service.js
const Schedule = require('../models/schedule.model');

class ScheduleService {
  async createSchedule(scheduleData) {
    const schedule = new Schedule(scheduleData);
    return await schedule.save();
  }

  async getSchedules(filters = {}) {
    return await Schedule.find(filters).sort({ date: 1, time: 1 });
  }

  async updateSchedule(id, updateData) {
    return await Schedule.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteSchedule(id) {
    return await Schedule.findByIdAndDelete(id);
  }

  async getSchedulesByDoctor(doctorName, startDate, endDate) {
    return await Schedule.find({
      doctorName,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }
}

module.exports = new ScheduleService();

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

// src/routes/schedule.routes.js
const express = require('express');
const { body } = require('express-validator');
const scheduleController = require('../controllers/schedule.controller');
const router = express.Router();

const validateSchedule = [
  body('patientName').notEmpty().trim(),
  body('doctorName').notEmpty().trim(),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('type').isIn(['CONSULTATION', 'FOLLOW_UP', 'EXAMINATION'])
];

router.post('/', validateSchedule, scheduleController.createSchedule);
router.get('/', scheduleController.getSchedules);
router.put('/:id', validateSchedule, scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;

// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const scheduleRoutes = require('./routes/schedule.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/schedules', scheduleRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Schedule service running on port ${PORT}`);
});