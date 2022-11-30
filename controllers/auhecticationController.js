const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

// const signToken = id => {
//   return jwt.sign(id, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };

// 1 SIGN IN USER
exports.signUp = async function(req, res, next) {
  // get user data
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  });

  // token created
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  try {
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'error while createing user'
    });
  }
};

// 2 LOGIN USER
exports.login = async function(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1 checkout email and password exist
    if (!email || !password) {
      throw 'Please provide email and password';
    }

    //2 check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      throw 'Incorrect email or password ';
    }
    // 3 if every thing ok send token to client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.protect = async function() {
  try {
    //  1 GET THE TOKEN AND CHECK IT IS THERE

    // 2 VALIDATE THE TOKEN

    // 3 VERIFICATION TOKEN

    // 4 CHECK IF USER STILL EXIST
    next();
  } catch (error) {}
};
