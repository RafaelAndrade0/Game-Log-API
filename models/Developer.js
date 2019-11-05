const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  foundation: {
    type: Date,
    required: [true, 'Please add a foundation date']
  },
  headquarters: {
    type: String,
    required: [true, 'Please add a headquarters']
  },
  website: {
    type: String,
    required: [true, 'Please add a website']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Developer', DeveloperSchema);