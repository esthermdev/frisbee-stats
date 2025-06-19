const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Server is running!', status: 'OK' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.post('/logs', (req, res) => {
  const { level, message, details } = req.body;
  console.log(`[CLIENT] ${level.toUpperCase()}: ${message}`, details || '');
  res.status(200).send('Log received');
});

module.exports = router;