const User = require('../models/User');
const ErrorResponse = require('../utils/appError');
const { signToken } = require('../utils/auth');

exports.register = async (userData) => {
  const { name, email, password, role } = userData;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return signToken(user);
};

exports.login = async (email, password) => {
  // Validate email and password
  if (!email || !password) {
    throw new ErrorResponse('Please provide an email and password', 400);
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  return signToken(user);
};

exports.getMe = async (userId) => {
  return await User.findById(userId);
};