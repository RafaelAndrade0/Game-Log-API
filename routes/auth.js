const express = require('express');
const router = express.Router();

// Load Controllers
const { register, login, getMe } = require('../controllers/auth');

// Middlewares
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').get(login);
router.route('/me').get(protect, getMe);

module.exports = router;
