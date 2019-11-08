const Review = require('../models/Review');
const asyncHandler = require('../middleware/asyncHandler');

const ErrorResponse = require('../utils/errorResponse');

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
// @access Public
exports.addReview = asyncHandler(async (req, res, next) => {
  // LoggedIn User is the user creating the review
  req.body.user = req.user.id;
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});

// @desc  Get a single Review
// @route GET api/v1/review/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse('Resource Not Found', 404));
  }

  res.status(200).json({ success: true, data: review });
});

// @desc  Delete a Review
// @route DELETE api/v1/review/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse('Resource Not Found', 404));
  }

  // Verify if the review belongs to the logged User
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        'This user is not authorized to delete this review',
        403
      )
    );
  }

  await review.remove();

  res.status(200).json({ success: true, data: {} });
});
