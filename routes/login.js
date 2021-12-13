const express = require('express'); 
const User = require('../models/user');

const loginController = require('../controller/login');

const router = express.Router(); 


router.post('/login', loginController.postLogin); 
router.post('/logout', loginController.postLogout)
module.exports = router;