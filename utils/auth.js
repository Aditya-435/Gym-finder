// utils/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signToken = (user) => {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = this.signToken(user);
  
  // Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('token', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};