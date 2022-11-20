const express = require('express');
const router = express.Router();

// CONTROLLERS
const toursControllers = require('../controllers/toursController');

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(toursControllers.updateTour)
  .delete(toursControllers.deleteTour);

module.exports = router;
