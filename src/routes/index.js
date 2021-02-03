const express = require('express')
const router = express.Router()

const routerAuth = require('./auth')
const routerUsers = require('./users')
const ticket = require('./ticket')
const booking = require('./booking')
const city = require('./city')

router
  .use('/auth', routerAuth)
  .use('/users', routerUsers)
  .use('/ticket', ticket)
  .use('/booking', booking)
  .use('/cities',city)
module.exports = router