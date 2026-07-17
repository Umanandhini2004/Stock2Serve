// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['consumer', 'merchant'],
    default: 'consumer',
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  // Merchant specific fields
  shopName: {
    type: String,
    trim: true,
  },
  businessCategory: {
    type: String,
    enum: [
      'bakery', 'cafe', 'restaurant', 'fastfood', 'foodstall',
      'homekitchen', 'salad', 'dessert', 'sweetshop', 'juice',
      'tiffin', 'mess', 'fruits', 'sandwich', 'tea',
      'cloudkitchen', 'supermarket', 'snacks', 'catering', 'other'
    ],
  },
  shopAddress: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  // Consumer specific fields
  address: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
