const express = require('express')
const router = express.Router()
const ticketControllers = require('../controllers/ticketControllers')
const { uploadMulter } = require('../middlewares/upload')

router.get('/ticketing', ticketControllers.ticketing)
router.get('/detail/:id', ticketControllers.detail)
router.get('/transaction', ticketControllers.transaction)
router.patch('/update/:id', uploadMulter.single('images'), ticketControllers.update)
router.post('/create', uploadMulter.single('images'), ticketControllers.create)

module.exports = router