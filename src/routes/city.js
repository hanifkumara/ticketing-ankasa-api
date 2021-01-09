const express = require('express')
const router = express.Router()
const cityControllers = require('../controllers/cityControllers')

router.get('/', cityControllers.view)

module.exports = router