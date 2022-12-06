const express = require('express');

const router = express.Router();

// CONTROLLERS
const usersControllers = require('../controllers/usersController');
const auhtController = require('../controllers/auhecticationController');

router.post('/sign-up', auhtController.signUp);
router.post('/login', auhtController.login);

router
  .route('/')
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createUser);
router
  .route('/:id')
  .get(usersControllers.getUser)
  .patch(usersControllers.updateUser)
  .delete(
    auhtController.protect,
    auhtController.restrictTo('admin'),
    usersControllers.deleteUser
  );

module.exports = router;
