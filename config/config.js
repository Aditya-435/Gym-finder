module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  COOKIE_EXPIRE: process.env.COOKIE_EXPIRE || 30,
};