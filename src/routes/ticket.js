const express = require('express')
const router = express.Router()
const ticketControllers = require('../controllers/ticketControllers')
const { uploadMulter } = require('../middlewares/upload')

router.post('/create', uploadMulter.single('images'), ticketControllers.create)

module.exports = router