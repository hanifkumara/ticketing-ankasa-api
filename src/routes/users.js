const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/users')
const { verifyToken } = require('../middlewares/verifyToken')

router
  .get('/', verifyToken, getUsers)

module.exports = router