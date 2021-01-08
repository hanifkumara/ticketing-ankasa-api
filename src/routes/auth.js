const express = require('express')
const router = express.Router()
const { login, register, forgotPassword, resetPassword } = require('../controllers/auth')

router
  .post('/login', login)
  .post('/register', register)
  .post('/forgot-password', forgotPassword)
  .patch('/reset-password', resetPassword)

module.exports = router