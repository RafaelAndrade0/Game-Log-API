const colors = require('colors');

const errorHandler = (error, req, res, next) => {
  console.log(colors.bgRed(error.stack));

  let statusCode = 500;
  let message = 'Generic Error';

  // Resource Not Found
  if (error.name === 'CastError') {
    statusCode = 404;
    message = 'Resource Not Found';
  }

  // Mongoose Duplicated Field
  if (error.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Mongoose Validation Error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors).map(val => val.message);
  }

  return res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
