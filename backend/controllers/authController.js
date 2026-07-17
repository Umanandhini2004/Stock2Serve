// backend/controllers/authController.js
const User = require('../models/User');
const generateJWT = require('../utils/generateJWT');
const path = require('path');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      mobileNumber,
      role,
      shopName,
      businessCategory,
      shopAddress,
      city,
      pincode,
      latitude,
      longitude,
      openingTime,
      closingTime,
      address,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Build user object
    const userData = {
      fullName,
      email,
      password,
      mobileNumber,
      role: role || 'consumer',
    };

    // Add merchant specific fields
    if (role === 'merchant') {
      userData.shopName = shopName;
      userData.businessCategory = businessCategory;
      userData.shopAddress = shopAddress;
      userData.city = city;
      userData.pincode = pincode;
      userData.latitude = latitude;
      userData.longitude = longitude;
      userData.openingTime = openingTime;
      userData.closingTime = closingTime;
    } else {
      userData.address = address;
      userData.city = city;
      userData.pincode = pincode;
      userData.latitude = latitude;
      userData.longitude = longitude;
    }

    // Handle profile photo
    if (req.file) {
      userData.profilePhoto = `/uploads/profile/${req.file.filename}`;
    }

    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateJWT(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateJWT(user._id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};