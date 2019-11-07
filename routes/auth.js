const express = require('express');
const router = express.Router();

// Load Controllers
const { register, login } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').get(login);

module.exports = router;