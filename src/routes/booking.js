const express = require('express')
const router = express.Router()
const bookingControllers = require('../controllers/bookingControllers')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/create', verifyToken, bookingControllers.create)

module.exports = router