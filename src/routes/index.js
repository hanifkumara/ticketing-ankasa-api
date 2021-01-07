const express = require('express')
const router = express.Router()
const routerAuth = require('./auth')
const routerUsers = require('./users')

router
  .use('/auth', routerAuth)
  .use('/users', routerUsers)

module.exports = router