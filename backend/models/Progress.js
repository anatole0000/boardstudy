const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  percentage: { type: Number, min: 0, max: 100, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', ProgressSchema);
