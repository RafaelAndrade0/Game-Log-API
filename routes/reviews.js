const express = require('express');
const router = express.Router({ mergeParams: true });

// Models
const Review = require('../models/Review');

// Midlewares
const filteredResults = require('../middleware/filteredResults');
const { protect } = require('../middleware/auth');

// Load Controllers
const {
  getReviews,
  addReview,
  getReview,
  deleteReview
} = require('../controllers/reviews');

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

router
  .route('/:id')
  .get(getReview)
  .delete(protect, deleteReview);

module.exports = router;
