const express = require('express');
const router = express.Router();

// Example route
router.post('/chat', (req, res) => {
  res.json({ message: 'AI route is working!' });
});

module.exports = router;
