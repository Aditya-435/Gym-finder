const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.protect,
    roleCheck.authorize('user', 'admin'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .put(
    authController.protect,
    roleCheck.authorize('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    roleCheck.authorize('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;