const Review = require('../models/Review');
const Gym = require('../models/Gym');
const ErrorResponse = require('../utils/appError');

exports.getReviews = async (gymId) => {
  if (gymId) {
    return await Review.find({ gym: gymId }).populate({
      path: 'user',
      select: 'name photo',
    });
  } else {
    return await Review.find().populate({
      path: 'user',
      select: 'name photo',
    });
  }
};

exports.getReview = async (id) => {
  const review = await Review.findById(id).populate({
    path: 'user',
    select: 'name photo',
  });

  if (!review) {
    throw new ErrorResponse(`Review not found with id of ${id}`, 404);
  }

  return review;
};

exports.createReview = async (reviewData, userId) => {
  // Check if gym exists
  const gym = await Gym.findById(reviewData.gym);

  if (!gym) {
    throw new ErrorResponse(`Gym not found with id of ${reviewData.gym}`, 404);
  }

  // Add user to review data
  reviewData.user = userId;

  return await Review.create(reviewData);
};

exports.updateReview = async (id, reviewData, userId) => {
  let review = await Review.findById(id);

  if (!review) {
    throw new ErrorResponse(`Review not found with id of ${id}`, 404);
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== userId && req.user.role !== 'admin') {
    throw new ErrorResponse(
      `User ${userId} is not authorized to update this review`,
      401
    );
  }

  review = await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  });

  return review;
};

exports.deleteReview = async (id, userId) => {
  const review = await Review.findById(id);

  if (!review) {
    throw new ErrorResponse(`Review not found with id of ${id}`, 404);
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== userId && req.user.role !== 'admin') {
    throw new ErrorResponse(
      `User ${userId} is not authorized to delete this review`,
      401
    );
  }

  await review.remove();
};