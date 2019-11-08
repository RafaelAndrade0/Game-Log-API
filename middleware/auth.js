const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Route Middleware
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies) {
    token = req.cookies['token'];
  }

  if (!token) {
    return next(new ErrorResponse('Not Authorized to acesss this route', 401));
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse('Not Authorized to acesss this route', 401));
  }

  next();
});

// Role Access Authorization
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `Role ${req.user.role} is not Authorized to acesss this route`,
        403
      )
    );
  }
  next();
};
