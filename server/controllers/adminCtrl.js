const Admin = require('../model/admin'); // Assuming 'models' is the directory for your Mongoose models
const bcryptjs =require('bcryptjs')

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ name }); // You might want to use email here for unique identification
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this name already exists' }); // Adjust message as needed
    }

    // Hash the password
    const hashedpassword = await bcryptjs.hash(req.body.password, 10)

    // Create a new admin
    const newAdmin = new Admin({
      name,
      password : hashedpassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // Consider providing a more specific error message if possible
  }
};

// Login an admin
exports.loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the admin by name
    const admin = await Admin.findOne({ name }); // You might want to use email here for login

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordMatch = await bcryptjs.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful (implement token generation/session management here)
    res.status(200).json({ message: 'Login successful' }); // You might want to return a token or other information upon successful login
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { name, currentPassword, newPassword, confirmPassword } = req.body;

    // Find the admin by name
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare current password
    const isCurrentPasswordMatch = await bcryptjs.compare(currentPassword, admin.password);
    if (!isCurrentPasswordMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    // Hash the new password
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    // Update the admin's password
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};