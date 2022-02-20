const express = require('express');
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

const router = express.Router();

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh', authService.authorize, controller.refresh);

module.exports = router;