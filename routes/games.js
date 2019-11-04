const express = require('express');
const router = express.Router();

// Load Controllers
const {
  getGames,
  addGame,
  getGame,
  deleteGame
} = require('../controllers/games');

router
  .route('/')
  .get(getGames)
  .post(addGame);

router
  .route('/:id')
  .get(getGame)
  .delete(deleteGame);

module.exports = router;
