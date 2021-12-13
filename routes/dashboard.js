const express = require('express'); 
const User = require('../models/user');

const dashboard = require('../controller/dashboard');
const { verifyToken } = require('../Utils/helper');

const router = express.Router(); 
router.get('/dashboard',verifyToken, dashboard.getDashBoard); 
module.exports = router;