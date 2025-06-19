const express = require('express');
const playerRoutes = require('./api/players');
const healthRoutes = require('./health');

const router = express.Router();

router.use('/api/players', playerRoutes);
router.use('/', healthRoutes);

module.exports = router;