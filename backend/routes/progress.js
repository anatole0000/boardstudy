const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Get all progress entries
router.get('/', async (req, res) => {
  const progressList = await Progress.find().sort({ updatedAt: -1 });
  res.json(progressList);
});

// Create new progress entry
router.post('/', async (req, res) => {
  const progress = new Progress(req.body);
  await progress.save();
  res.json(progress);
});

// Update progress
router.put('/:id', async (req, res) => {
  const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete progress
router.delete('/:id', async (req, res) => {
  await Progress.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
