const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router //alias route for http://127.0.0.1:3000/api/v1/tours/top-5-cheap, logic in tourController
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
