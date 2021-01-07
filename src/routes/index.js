const express = require('express')
const router = express.Router()

const routerAuth = require('./auth')
const routerUsers = require('./users')
const ticket = require('./ticket')

router
  .use('/auth', routerAuth)
  .use('/users', routerUsers)
  router.use('/ticket', ticket)
module.exports = router