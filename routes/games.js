const express = require('express');
const router = express.Router();

// Load Controllers
const { getGames, addGame } = require('../controllers/games');

router
  .route('/')
  .get(getGames)
  .post(addGame);

module.exports = router;
