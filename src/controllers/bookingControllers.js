const model = require('../models/index')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')
const Sequelize = require('sequelize')
const fs = require('fs')
const QRCode = require('qrcode')
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
    detail: (req, res) => {
        model.booking.findAll({
            include: [{
                model: model.ticket
            }],
            where: { id: req.params.id }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get detail my booking')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    create: (req, res) => {
        const data = req.body
        const kode = uuidv4().split('-')[0]
        data.id = kode
        console.log(kode)
        model.booking.create(data)
            .then((result) => {
                return helper.response('success', res, result, 200, 'created successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    update: (req, res) => {
        const path = `./images/${req.params.id}.png`

        model.booking.findAll({
            include: [
                {model: model.ticket},
                { model: model.users }
            ],
            where: { id: req.params.id }
        }).then((result) => {
            const text = `name: ${result[0].user.fullname}\nEmail: ${result[0].user.email}\nKode Ticket: ${req.params.id}\nPrice: ${result[0].ticket.price}\nAirlines: ${result[0].ticket.name_maskapai}`
            QRCode.toFile(path, text, {
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            errorCorrectionLevel: 'L',
            margin:3,
            scale: 6
            }, function (err) {
                if (err) throw err
                const data = {
                    status: 'successfully paid',
                    qrcode: `${process.env.BASE_URL}/images/${req.params.id}.png`
                }
                    model.booking.update(data, {
                        where: { id: req.params.id }
                    }).then((result2)=>{
                        return helper.response('success', res, result2, 200, 'update successfully')
                    })
            })
        })
    }
}
module.exports = bookings