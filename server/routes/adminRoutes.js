const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');

router.post('/register', adminCtrl.registerAdmin);
router.post('/login', adminCtrl.loginAdmin);
router.put('/change-password', adminCtrl.changePassword);

module.exports = router;