const mongoose = require('mongoose');

const TimetableEntrySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  startTime: { type: String, required: true }, // Format: "14:00"
  endTime: { type: String, required: true },   // Format: "15:30"
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimetableEntry', TimetableEntrySchema);
