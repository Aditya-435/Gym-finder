const Gym = require('../models/Gym');
const geocoder = require('../utils/geocoder');
const APIFeatures = require('../utils/apiFeatures');
const ErrorResponse = require('../utils/appError');

exports.getGyms = async (queryStr) => {
  const features = new APIFeatures(Gym.find(), queryStr)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query.populate('reviews');
};

exports.getGym = async (id) => {
  const gym = await Gym.findById(id).populate('reviews').populate('subscriptions');

  if (!gym) {
    throw new ErrorResponse(`Gym not found with id of ${id}`, 404);
  }

  return gym;
};

exports.createGym = async (gymData, ownerId) => {
  // Add owner to gym data
  gymData.owner = ownerId;

  const gym = await Gym.create(gymData);

  return gym;
};

exports.updateGym = async (id, gymData, ownerId) => {
  let gym = await Gym.findById(id);

  if (!gym) {
    throw new ErrorResponse(`Gym not found with id of ${id}`, 404);
  }

  // Make sure user is gym owner or admin
  if (gym.owner.toString() !== ownerId && req.user.role !== 'admin') {
    throw new ErrorResponse(
      `User ${ownerId} is not authorized to update this gym`,
      401
    );
  }

  gym = await Gym.findByIdAndUpdate(id, gymData, {
    new: true,
    runValidators: true,
  });

  return gym;
};

exports.deleteGym = async (id, ownerId) => {
  const gym = await Gym.findById(id);

  if (!gym) {
    throw new ErrorResponse(`Gym not found with id of ${id}`, 404);
  }

  // Make sure user is gym owner or admin
  if (gym.owner.toString() !== ownerId && req.user.role !== 'admin') {
    throw new ErrorResponse(
      `User ${ownerId} is not authorized to delete this gym`,
      401
    );
  }

  await gym.remove();
};

exports.getGymsInRadius = async (zipcode, distance) => {
  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  return await Gym.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
};