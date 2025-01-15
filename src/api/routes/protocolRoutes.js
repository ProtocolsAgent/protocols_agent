const express = require('express');
const router = express.Router();
const protocolController = require('../controllers/protocolController');

router.get('/orca', protocolController.getOrcaInfo);
router.get('/ray', protocolController.getRayInfo);

module.exports = router;
