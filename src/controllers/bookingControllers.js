const model = require('../models/index')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')
const Sequelize = require('sequelize')
const fs = require('fs')
const Op = Sequelize.Op
const bookings = {
    mybooking: (req, res) => {
        model.booking.findAll({
            include: [{
                model: model.ticket
            }],
            where:{user_id : req.params.id}
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get my booking')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })

    },
    create: (req, res) => {
        const data = req.body
        model.booking.create(data)
            .then((result) => {
                return helper.response('success', res, result, 200, 'created successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = bookings