const express = require('express');
const router = express.Router({ mergeParams: true });

// Models
const Review = require('../models/Review');

// Midlewares
const filteredResults = require('../middleware/filteredResults');

// Load Controllers
const { getReviews, addReview } = require('../controllers/reviews');

router
  .route('/')
  .get(
    filteredResults(Review, [
      {
        path: 'game',
        select: 'title description '
      }
    ]),
    getReviews
  )
  .post(addReview);

module.exports = router;
