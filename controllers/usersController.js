const User = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(500).json({
      status: 'success',
      results: users.length,
      message: 'Get All Users',
      data: {
        data: users
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'This Routes are not defines!'
    });
  }
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Routes are not defines!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Routes are not defines!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Routes are not defines!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Routes are not defines!'
  });
};
