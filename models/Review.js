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

ReviewSchema.statics.getAverageScore = async function(gameId) {
  const obj = await this.aggregate([
    { $match: { game: gameId } },
    {
      $group: {
        _id: '$game',
        averageScore: { $avg: '$score' }
      }
    }
  ]);

  try {
    // console.log(obj[0].averageScore);
    await this.model('Game').findByIdAndUpdate(gameId, {
      averageScore: obj[0].averageScore
    });
  } catch (error) {
    console.log(error);
  }
};

// Call After Saving a Review
ReviewSchema.post('save', function() {
  this.constructor.getAverageScore(this.game);
});

// Call getAverageRating() before remove
ReviewSchema.pre('remove', function() {
  this.constructor.getAverageScore(this.game);
});

module.exports = mongoose.model('Review', ReviewSchema);
