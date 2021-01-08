const model = require('../models/index')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')
const Sequelize = require('sequelize')
const fs = require('fs')
const Op = Sequelize.Op
const bookings = {
    create: (req, res) => {
        console.log(req.body)
    }
}
module.exports = bookings