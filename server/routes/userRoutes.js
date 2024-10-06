const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router();

// Apply the authentication middleware to routes that require it
router.use('/profile', userCtrl.authenticateToken);
router.use('/updateProfile', userCtrl.authenticateToken);
router.use('/change-password', userCtrl.authenticateToken);
router.use('/user/:userId/block', userCtrl.authenticateToken);
router.use('/user/:userId/activate', userCtrl.authenticateToken);

// Public routes
router.post('/register', userCtrl.Register);
router.post('/login', userCtrl.Login);

// Authenticated routes
router.get('/users', userCtrl.getUsers);  
router.get('/getId', userCtrl.getuserId);                   // Admin-level to fetch users
router.get('/userCount', userCtrl.getUserCount);           // Admin-level to get user count
router.get('/profile', userCtrl.getProfile);               // Get logged-in user's profile
router.put('/updateProfile', userCtrl.updateProfile);      // Update logged-in user's profile
router.put('/change-password', userCtrl.changePassword);   // Change password for logged-in user
router.put('/:userId/block', userCtrl.blockUser);
router.put('/:userId/activate', userCtrl.activateUser);
router.get('/user/:id', userCtrl.getUserById);             // Fetch user by ID (Admin-level)

// Admin route to get profile of another user by ID
router.get('/:userId/profile', userCtrl.getProfile);

module.exports = router;
