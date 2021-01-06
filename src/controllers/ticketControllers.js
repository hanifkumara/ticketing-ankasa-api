const model = require('../models/index')
const helper = require('../helpers/helpers')
const Sequelize = require('sequelize')
const fs = require('fs')
const Op = Sequelize.Op
const tickets = {
    create: (req, res) => {
        let data = req.body
        data = JSON.parse(JSON.stringify(data))
        data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
        model.ticket.create(data)
            .then((result) => {
                return helper.response('success', res, result, 200, 'created successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = tickets