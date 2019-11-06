const Review = require('../models/Review');
const asyncHandler = require('../middleware/asyncHandler');

// @desc  Get All Reviews
// @route GET api/v1/reviews
// @route GET api/v1/games/:gameId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.gameId) {
    const reviews = await Review.find({ game: req.params.gameId });
    res.status(200).json({ success: true, data: reviews });
  } else {
    res.status(200).json(res.filteredResults);
  }
});

// @desc  Add a Review
// @route POST api/v1/review
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});
