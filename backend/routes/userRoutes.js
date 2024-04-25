const express = require('express');
const { registerUser, loginUser, findMyProfile } = require('../controllers/userController');
const router = express.Router()


router.post('/register-user', registerUser)
router.post('/login-user', loginUser)
router.get('/my-profile/:id', findMyProfile)

module.exports = router