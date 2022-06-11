const express = require('express')
const authServices = require('../../services/auth-services/authServices')
const validationMiddleware = require('../../middleware/validationMiddleware')
const authDao = require('../../dao/auth-dao/authDao')
const router = express.Router()

// router.post('/login', authServices.login)
router.post('/login', authDao.login)
// router.post('/signup', validationMiddleware.signUpValidator, authServices.signup)
router.post('/signup', authServices.signup)

module.exports = router