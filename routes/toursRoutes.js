const express = require('express');

const router = express.Router();
const authContoller = require('../controllers/auhecticationController');

// CONTROLLERS
const toursControllers = require('../controllers/toursController');

router
  .route('/')
  .get(authContoller.protect, toursControllers.getAllTours)
  .post(toursControllers.createTour);
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(toursControllers.updateTour)
  .delete(
    authContoller.protect,
    authContoller.restrictTo('admin', 'user'),
    toursControllers.deleteTour
  );

module.exports = router;
