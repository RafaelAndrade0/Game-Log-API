const express = require('express');
const router = express.Router();

// Midlewares
const filteredResults = require('../middleware/filteredResults');

// Models
const Game = require('../models/Game');

// Load Controllers
const {
  getGames,
  addGame,
  getGame,
  deleteGame,
  updateGame
} = require('../controllers/games');

router
  .route('/')
  .get(filteredResults(Game), getGames)
  .post(addGame);

router
  .route('/:id')
  .get(getGame)
  .put(updateGame)
  .delete(deleteGame);

module.exports = router;
