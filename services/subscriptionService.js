const Subscription = require('../models/Subscription');
const Gym = require('../models/Gym');
const ErrorResponse = require('../utils/appError');

exports.getSubscriptions = async (gymId, userId) => {
  if (gymId) {
    return await Subscription.find({ gym: gymId }).populate('user');
  } else if (userId) {
    return await Subscription.find({ user: userId }).populate('gym');
  } else {
    return await Subscription.find().populate('user').populate('gym');
  }
};

exports.getSubscription = async (id) => {
  const subscription = await Subscription.findById(id)
    .populate('user')
    .populate('gym');

  if (!subscription) {
    throw new ErrorResponse(`Subscription not found with id of ${id}`, 404);
  }

  return subscription;
};

exports.createSubscription = async (subscriptionData, userId) => {
  // Check if gym exists
  const gym = await Gym.findById(subscriptionData.gym);

  if (!gym) {
    throw new ErrorResponse(
      `Gym not found with id of ${subscriptionData.gym}`,
      404
    );
  }

  // Add user to subscription data
  subscriptionData.user = userId;

  // Calculate end date based on plan
  const startDate = new Date();
  let endDate = new Date();

  switch (subscriptionData.plan) {
    case 'monthly':
      endDate.setMonth(startDate.getMonth() + 1);
      break;
    case 'quarterly':
      endDate.setMonth(startDate.getMonth() + 3);
      break;
    case 'yearly':
      endDate.setFullYear(startDate.getFullYear() + 1);
      break;
    default:
      throw new ErrorResponse('Invalid subscription plan', 400);
  }

  subscriptionData.startDate = startDate;
  subscriptionData.endDate = endDate;

  return await Subscription.create(subscriptionData);
};

exports.cancelSubscription = async (id, userId) => {
  const subscription = await Subscription.findById(id);

  if (!subscription) {
    throw new ErrorResponse(`Subscription not found with id of ${id}`, 404);
  }

  // Make sure subscription belongs to user or user is admin
  if (subscription.user.toString() !== userId && req.user.role !== 'admin') {
    throw new ErrorResponse(
      `User ${userId} is not authorized to cancel this subscription`,
      401
    );
  }

  subscription.status = 'cancelled';
  await subscription.save();

  return subscription;
};