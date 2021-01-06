const express = require('express')
const router = express.Router()
const ticket = require('./ticket')
router.use('/ticket', ticket)
module.exports = router