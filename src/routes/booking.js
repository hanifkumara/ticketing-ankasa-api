const express = require('express')
const router = express.Router()
const bookingControllers = require('../controllers/bookingControllers')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/my-booking/:id', verifyToken, bookingControllers.mybooking)
router.post('/create', verifyToken, bookingControllers.create)

module.exports = router