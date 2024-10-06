const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../model/user');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
// Controller for changing password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // Extract userId from the token

  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to generate a unique user ID starting from 1001
const generateUserId = async () => {
  try {
    const lastUser = await User.findOne().sort({ userId: -1 });
    const lastUserId = lastUser ? parseInt(lastUser.userId) : 1000;
    const newUserId = lastUserId + 1;
    return newUserId.toString();
  } catch (error) {
    console.error('Error generating user ID:', error);
    throw new Error('Error generating user ID');
  }
};

// Register function to handle user registration
const Register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByMobile = await User.findOne({ mobile });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    if (existingUserByMobile) {
      return res
        .status(400)
        .json({ message: 'Mobile number already registered' });
    }

    const userId = await generateUserId();
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      userId,
      name,
      email,
      mobile,
      password: hashedPassword,
      status: 'active', // Set default status
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login function to handle user login
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ errorMessage: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { userId: 1, name: 1, email: 1, mobile: 1, creation_date: 1, status: 1 }
    );
    res.status(200).json({ userValues: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user count
const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ message: 'Success', count: count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', data: user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.status === 'blocked') {
      return res.status(400).json({ success: false, message: 'User is already blocked' });
    }

    user.status = 'blocked';
    await user.save();

    res.json({ success: true, message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.status === 'active') {
      return res.status(400).json({ success: false, message: 'User is already active' });
    }

    user.status = 'active';
    await user.save();

    res.json({ success: true, message: 'User activated successfully' });
  } catch (error) {
    console.error('Error activating user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getuserId = async (req, res) => {
  try {
    const userIds = await User.find({ userId: { $exists: true } });
    const userIdValues = userIds.map((item) => item.userId);
    res.status(200).send({ userIdValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching book id' });
  }
};
module.exports = {
  Login,
  authenticateToken,
  Register,
  getUsers,
  getProfile,
  updateProfile,
  getUserCount,
  blockUser,
  activateUser,
  getUserById,
  changePassword,
  getuserId,
};
