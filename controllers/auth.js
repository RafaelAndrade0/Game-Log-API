const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc  Register User
// @route GET api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;

  const user = await User.create({ name, email, role, password });

  const token = user.getSignedJwtToken();

  res.status(201).json({ success: true, token });
});

// @desc  Login User
// @route GET api/v1/auth/Login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new ErrorResponse('There is no user with this credentials', 404)
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 400));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
