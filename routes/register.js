const express = require('express');

const router = express.Router();
const registerController = require('../controller/register')

router.post('/register', registerController.postRegister)

module.exports =router;