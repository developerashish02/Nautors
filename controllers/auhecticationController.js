/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

// const signToken = id => {
//   return jwt.sign(id, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };

// 1 SIGN IN USER
exports.signUp = async function(req, res, next) {
  // get user data
  const {
    name,
    email,
    password,
    passwordConfirm,
    passwordChnagedAt
  } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChnagedAt
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
  // let errorMessage = { code: 401, message: myMessage };

  try {
    const { email, password } = req.body;

    // 1 checkout email and password exist
    if (!email || !password) {
      // throw 'Please provide email and password';
      // throw { code: 401, message: 'Please provide email and password' };
      throw 'Please provide email and password';
      // throw Object.assign(new Error('Please provide email and password'), {
      //   code: 401
      // });
    }

    //2 check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      throw 'Incorrect email or password ';
      // throw Object.assign(new Error('Incorrect email or password '), {
      //   code: 401
      // });
    }
    // 3 if every thing ok send token to client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.protect = async function(req, res, next) {
  try {
    //  1 GET THE TOKEN AND CHECK IT IS THERE
    // console.log(req.headers.authorization.startWith('Bearer'), '***');
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw 'You are not logged in Please log in to get access';
    }
    // 2 VALIDATE THE TOKEN
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // 3 VERIFICATION TOKEN
    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      throw 'The user belonging to this token no longer exist ';
    }
    // 4 CHECK IF USER STILL EXIST
    if (currentUser.chnagePasswordAfter(decode.iat)) {
      throw 'User recently chnaged password pls login again';
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.json({
      status: 'fail',
      message: err
    });
  }
};

// check permission
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw 'You do not have permission to perform this action';
      }

      next();
    } catch (error) {
      res.json({
        status: 'fail',
        message: error
      });
    }
  };
};
