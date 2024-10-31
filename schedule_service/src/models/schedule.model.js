// src/models/schedule.model.js

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model('Schedule', scheduleSchema);