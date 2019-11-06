const express = require('express');
const router = express.Router();

// Midlewares
const filteredResults = require('../middleware/filteredResults');

// Models
const Game = require('../models/Game');

// Include others resource routes
const reviewsRouter = require('../routes/reviews');

// Load Controllers
const {
  getGames,
  addGame,
  getGame,
  deleteGame,
  updateGame,
  gamePhotoUpload
} = require('../controllers/games');

// Redirect to reviews router
router.use('/:gameId/reviews', reviewsRouter);

router
  .route('/')
  .get(
    filteredResults(Game, [
      { path: 'developer', select: 'name description headquarters website' },
      { path: 'reviews' }
    ]),
    getGames
  )
  // .get(
  //   filteredResults(Game, {
  //     path: 'developer',
  //     select: 'name description headquarters website'
  //   }),
  //   getGames
  // )
  .post(addGame);

router
  .route('/:id')
  .get(getGame)
  .put(updateGame)
  .delete(deleteGame);

router.route('/:id/photo').put(gamePhotoUpload);

module.exports = router;
