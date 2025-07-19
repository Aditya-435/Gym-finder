const subscriptionService = require('../services/subscriptionService');
const ErrorResponse = require('../utils/appError');

// @desc    Get subscriptions
// @route   GET /api/v1/subscriptions
// @route   GET /api/v1/gyms/:gymId/subscriptions
// @route   GET /api/v1/users/:userId/subscriptions
// @access  Private
exports.getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptions(
      req.params.gymId,
      req.params.userId
    );

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single subscription
// @route   GET /api/v1/subscriptions/:id
// @access  Private
exports.getSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getSubscription(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create subscription
// @route   POST /api/v1/gyms/:gymId/subscriptions
// @access  Private
exports.createSubscription = async (req, res, next) => {
  try {
    req.body.gym = req.params.gymId;
    const subscription = await subscriptionService.createSubscription(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel subscription
// @route   PUT /api/v1/subscriptions/:id/cancel
// @access  Private
exports.cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.cancelSubscription(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};