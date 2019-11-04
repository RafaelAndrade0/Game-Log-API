const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 50 characters']
  },
  genre: {
    type: [String],
    required: true,
    enum: ['plataform', 'action', 'rpg', 'jrpg']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  plataform: {
    type: [String],
    required: true,
    enum: ['']
  },
  publisher: {
    type: String,
    required: true
  },
  developer: {
    type: [String],
    required: true
  },
  initialrelease: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Game', GameSchema);
