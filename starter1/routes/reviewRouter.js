const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

/**
 * les {@link router} de module `Reviwes`...
 * ```js
 * const router = express.Router({ mergeParams: true });
 * ```
 */
const router = express.Router({ mergeParams: true });
// *  mergeParams=> to merge and get access

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
