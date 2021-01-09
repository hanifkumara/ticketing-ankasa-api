const express = require('express')
const router = express.Router()

const routerAuth = require('./auth')
const routerUsers = require('./users')
const ticket = require('./ticket')
const booking = require('./booking')

router
  .use('/auth', routerAuth)
  .use('/users', routerUsers)
  .use('/ticket', ticket)
  .use('/booking', booking)
module.exports = router