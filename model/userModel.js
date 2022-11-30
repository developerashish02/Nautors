const mongoose = require('mongoose');
const bcript = require('bcryptjs');

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
    minLength: 8,
    select: false
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

// mongoose middleware
userSchema.pre('save', async function(next) {
  //  1 only run this function when password is modified
  if (!this.isModified('password')) return next();

  // 2 Hash the password with cost of 12
  this.password = await bcript.hash(this.password, 12);

  // delete confirm password field
  this.passwordConfirm = undefined;
  next();
});

//    compare password
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcript.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
