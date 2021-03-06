const mongoose = require('mongoose');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrpyt.genSalt(10);
  this.password = await bcrpyt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match Password
UserSchema.methods.matchPassword = function(enteredPassword) {
  return bcrpyt.compare(enteredPassword, this.password);
};

// Generate Hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  console.log(`Reset Token User Model: ${resetToken}`);

  // Hash Token and set resetPasswordToken with it
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set Expire Time (10 mins from now)
  this.resetPasswordExpire = Date.now() + 10 + 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
