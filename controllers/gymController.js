const gymService = require('../services/gymService');
const ErrorResponse = require('../utils/appError');

// @desc    Get all gyms
// @route   GET /api/v1/gyms
// @access  Public
exports.getGyms = async (req, res, next) => {
  try {
    const gyms = await gymService.getGyms(req.query);

    res.status(200).json({
      success: true,
      count: gyms.length,
      data: gyms,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single gym
// @route   GET /api/v1/gyms/:id
// @access  Public
exports.getGym = async (req, res, next) => {
  try {
    const gym = await gymService.getGym(req.params.id);

    res.status(200).json({
      success: true,
      data: gym,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new gym
// @route   POST /api/v1/gyms
// @access  Private
exports.createGym = async (req, res, next) => {
  try {
    const gym = await gymService.createGym(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: gym,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update gym
// @route   PUT /api/v1/gyms/:id
// @access  Private
exports.updateGym = async (req, res, next) => {
  try {
    const gym = await gymService.updateGym(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: gym,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete gym
// @route   DELETE /api/v1/gyms/:id
// @access  Private
exports.deleteGym = async (req, res, next) => {
  try {
    await gymService.deleteGym(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get gyms within a radius
// @route   GET /api/v1/gyms/radius/:zipcode/:distance
// @access  Public
exports.getGymsInRadius = async (req, res, next) => {
  try {
    const { zipcode, distance } = req.params;
    const gyms = await gymService.getGymsInRadius(zipcode, distance);

    res.status(200).json({
      success: true,
      count: gyms.length,
      data: gyms,
    });
  } catch (err) {
    next(err);
  }
};