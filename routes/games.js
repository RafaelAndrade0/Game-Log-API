const express = require('express');
const router = express.Router();

// Load Controllers
const { getGames } = require('../controllers/games');

router.route('/').get(getGames);

module.exports = router;
