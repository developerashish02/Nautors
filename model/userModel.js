const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true
  },

  email: {
    type: String,
    require: [true, 'Please Provide Your Email'],
    trim: true,
    unique: true,
    lowercase: true
  },

  photo: String,

  password: {
    type: String,
    trim: true,
    require: [true, 'Please provide a password'],
    minLength: 8
  },

  passwordConfirm: {
    type: String,
    require: [true, 'Please provide a Confirm password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'password and confirm password are not the same'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
