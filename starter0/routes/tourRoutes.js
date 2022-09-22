const express = require('express');

const TourController = require('../controllers/tourController');

// routes
const router = express.Router();

router
  .route('/')
  .get(TourController.getAllTours)
  .post(TourController.createTour);
router
  .route('/:id')
  .get(TourController.getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

module.exports = router;
