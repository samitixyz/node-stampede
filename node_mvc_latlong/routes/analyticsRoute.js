const express = require('express');
const app = require('../app');
const router = express.Router();
const validateIP = require('../utilities/Validation/validateIP.js');
const storeController = require('../controllers/storeController');
const fetchController = require('../controllers/fetchController');
router.route('/analytics').post(storeController.postAnalytics).get(validateIP.validateIP, fetchController.getAnalytics);
module.exports = router;
