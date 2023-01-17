const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/users.controller');
const { isUserNameOrEmailAlreadyExists, isValidPassword, verifyToken } = require('../../hooks/Auth/index')


//signUp User
router.post('/signup', isUserNameOrEmailAlreadyExists, userCtrl.signUp);

//login Users
router.post('/login', isValidPassword, userCtrl.login);

module.exports = router;