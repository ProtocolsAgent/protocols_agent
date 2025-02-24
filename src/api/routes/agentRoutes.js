const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.post('/chat', agentController.chat);

module.exports = router;
