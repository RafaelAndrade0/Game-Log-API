const express = require('express');
const router = express.Router();

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
  .get(getGames)
  .post(addGame);

router
  .route('/:id')
  .get(getGame)
  .put(updateGame)
  .delete(deleteGame);

module.exports = router;
