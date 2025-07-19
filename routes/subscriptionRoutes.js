const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    authController.protect,
    subscriptionController.getSubscriptions
  )
  .post(
    authController.protect,
    roleCheck.authorize('user', 'admin'),
    subscriptionController.createSubscription
  );

router
  .route('/:id')
  .get(
    authController.protect,
    subscriptionController.getSubscription
  );

router
  .route('/:id/cancel')
  .put(
    authController.protect,
    roleCheck.authorize('user', 'admin'),
    subscriptionController.cancelSubscription
  );

module.exports = router;