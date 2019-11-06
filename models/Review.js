const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 100,
    maxlength: 1000,
    required: [true, 'Please add some review']
  },
  slug: String,
  score: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, 'Please add a score']
  },
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
