const reviewService = require('../services/reviewService');
const ErrorResponse = require('../utils/appError');

// @desc    Get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/gyms/:gymId/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews(req.params.gymId);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await reviewService.getReview(req.params.id);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add review
// @route   POST /api/v1/gyms/:gymId/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    req.body.gym = req.params.gymId;
    const review = await reviewService.createReview(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};