const express = require('express');
const router = express.Router();
const LearningGoal = require('../models/LearningGoal');

// GET all goals
router.get('/', async (req, res) => {
  const goals = await LearningGoal.find().sort({ createdAt: -1 });
  res.json(goals);
});

// POST create goal
router.post('/', async (req, res) => {
  const goal = new LearningGoal(req.body);
  await goal.save();
  res.json(goal);
});

// PUT update goal
router.put('/:id', async (req, res) => {
  const updated = await LearningGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE goal
router.delete('/:id', async (req, res) => {
  await LearningGoal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
