const express = require('express')
const router = express.Router()
const bookingControllers = require('../controllers/bookingControllers')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/my-booking', verifyToken, bookingControllers.mybooking)
router.get('/my-booking-detail/:id', verifyToken, bookingControllers.detail)
router.post('/create', verifyToken, bookingControllers.create)
router.patch('/update/:id', verifyToken, bookingControllers.update)
router.delete('/delete/:id', verifyToken, bookingControllers.delete)

module.exports = router