const express = require('express');

const router = express.Router();

const TourController = require('../controllers/tourController');

// router.param('id', TourController.checkID);

// routes

router
  .route('/top-5-cheap')
  .get(TourController.aliasTopTours, TourController.getAllTours);

router.route('/tour-stats').get(TourController.getTourStats);
router.route('/monthly-plan/:year').get(TourController.getMonthlyPlan);
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
