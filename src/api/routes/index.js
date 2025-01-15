const express = require('express');
const router = express.Router();
const agentRoutes = require('./agentRoutes');
const protocolRoutes = require('./protocolRoutes');

router.use('/agent', agentRoutes);
router.use('/protocols', protocolRoutes);

module.exports = router;
