const express = require('express');
const authRoutes = require('./authRoutes');
const gymRoutes = require('./gymRoutes');
const reviewRoutes = require('./reviewRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/gyms', gymRoutes);
router.use('/gyms/:gymId/reviews', reviewRoutes);
router.use('/gyms/:gymId/subscriptions', subscriptionRoutes);
router.use('/users/:userId/subscriptions', subscriptionRoutes);

module.exports = router;