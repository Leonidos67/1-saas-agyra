// models/Follow.js
const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  follower: {
    type: String,  // СТРОКА вместо ObjectId
    required: true
  },
  following: {
    type: String,  // СТРОКА вместо ObjectId
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Индекс на строковые поля
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ follower: 1 });
followSchema.index({ following: 1 });

module.exports = mongoose.model('Follow', followSchema);