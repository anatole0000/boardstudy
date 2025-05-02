// routes/ai.js
const express = require('express');
const router = express.Router();
const estimatePriority = require('../ai/priority');

router.post('/priority', (req, res) => {
  const { text } = req.body;
  const priority = estimatePriority(text);
  res.json({ priority });
});

module.exports = router;
