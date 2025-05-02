const express = require('express');
const router = express.Router();
const TimetableEntry = require('../models/TimetableEntry');

// Get all timetable entries
router.get('/', async (req, res) => {
  const entries = await TimetableEntry.find().sort({ day: 1, startTime: 1 });
  res.json(entries);
});

// Create
router.post('/', async (req, res) => {
  const entry = new TimetableEntry(req.body);
  await entry.save();
  res.json(entry);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await TimetableEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await TimetableEntry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
