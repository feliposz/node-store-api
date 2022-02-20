const express = require('express');
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

const router = express.Router();

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);

module.exports = router;