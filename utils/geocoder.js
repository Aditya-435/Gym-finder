const nodeGeocoder = require('node-geocoder');
const config = require('../config/config');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;