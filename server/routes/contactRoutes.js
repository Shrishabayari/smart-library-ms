const express=require('express');
const submitMessage = require('../controllers/contactCtrl');

const router=express.Router()
router.post('/contact',submitMessage)
module.exports=router;