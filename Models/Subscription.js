const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  gym: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gym',
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ['monthly', 'quarterly', 'yearly'],
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  },
  paymentLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate subscriptions
subscriptionSchema.index({ user: 1, gym: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);