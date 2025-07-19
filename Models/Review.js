const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5'],
  },
  gym: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gym',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per gym
reviewSchema.index({ gym: 1, user: 1 }, { unique: true });

// Static method to get average rating and save
reviewSchema.statics.getAverageRating = async function (gymId) {
  const obj = await this.aggregate([
    {
      $match: { gym: gymId },
    },
    {
      $group: {
        _id: '$gym',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Gym').findByIdAndUpdate(gymId, {
      averageRating: obj[0] ? obj[0].averageRating : 0,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.gym);
});

// Call getAverageRating before remove
reviewSchema.post('remove', function () {
  this.constructor.getAverageRating(this.gym);
});

module.exports = mongoose.model('Review', reviewSchema);