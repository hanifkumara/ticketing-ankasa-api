const express = require('express')
const router = express.Router()
const ticketControllers = require('../controllers/ticketControllers')
const { verifyToken } = require('../middlewares/verifyToken')
const { uploadMulter } = require('../middlewares/upload')

router.get('/ticketing',verifyToken, ticketControllers.ticketing)
router.get('/detail/:id',verifyToken, ticketControllers.detail)
router.get('/transaction',verifyToken, ticketControllers.transaction)
router.patch('/update/:id',verifyToken, uploadMulter.single('images'), ticketControllers.update)
router.post('/create',verifyToken, uploadMulter.single('images'), ticketControllers.create)

module.exports = router