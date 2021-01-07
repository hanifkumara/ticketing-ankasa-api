const express = require('express')
const router = express.Router()
const { getUsers, getMyProfile, updateProfile } = require('../controllers/users')
const { verifyToken } = require('../middlewares/verifyToken')
const { uploadMulter } = require('../middlewares/upload')

router
  .get('/', verifyToken, getUsers)
  .get('/my-profile', verifyToken, getMyProfile)
  .patch('/', verifyToken, uploadMulter.single('photo'), updateProfile)

module.exports = router