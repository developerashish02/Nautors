const User = require('../model/userModel');

exports.signUp = async function(req, res, next) {
  const newUser = await User.create(req.body);

  try {
    res.status(201).json({
      status: 'success',
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
