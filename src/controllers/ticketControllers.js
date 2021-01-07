const model = require('../models/index')
const helper = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid')
const Sequelize = require('sequelize')
const fs = require('fs')
const Op = Sequelize.Op
let cek = {}
const tickets = {
    searchTicket: (req, res) => {
        cek = req.query
        console.log(req.query)
        model.ticket.findAll({
            where: req.query
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get all')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    filter: (req, res) => {
        const data = req.query
        if (data.transit === undefined || data.transit === '') {
            var transit = {}
        } else {
            var transit = {transit: data.transit}
        }

        if (data.name_maskapai === undefined || data.name_maskapai === '') {
            var name_maskapai = {}
        } else {
             var name_maskapai = { name_maskapai: data.name_maskapai }
        }

        if (data.time_departure === undefined || data.time_departure === '') {
            var departure = {}
        } else {
        data.time_departure = data.time_departure.split('-')
           var departure = {
                time_departure: {
                    [Op.between]: [data.time_departure[0], data.time_departure[1]]
                }
            }
        }
        if (data.time_arrived === undefined || data.time_arrived === ''){
            var arrived = {}
            
        } else {
            data.time_arrived = data.time_arrived.split('-')
            var arrived = {
                time_arrived: {
                    [Op.between]: [data.time_arrived[0], data.time_arrived[1]]
                }
            }
        }
        model.ticket.findAll({
            where: {
                [Op.and]: [
                    cek,
                    transit,
                    name_maskapai,
                    departure,
                    arrived

                ]
            }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'get')
            })
            .catch((err) => {
                helper.response('error', res, null, 401, err)
            })
    },
    update: (req, res) => {
        let data = req.body
        const id = req.params.id
        data = JSON.parse(JSON.stringify(data))

        if (!req.file) {
            data.updatedAt = new Date()
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 4388608) {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 4MB')
        } else {
            data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
            // process delete image on folder server
            model.ticket.findAll({
                attributes: ['id', 'images'],
                where: { id: id }
            })
                .then((result) => {
                    const images = result[0].dataValues.images
                        const pict = images.split('/')[4]
                        const path = `./images/${pict}`
                        fs.unlinkSync(path)
                })
        }
        
        model.ticket.update(data,{
            where: { id: id }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, 'update successfully')
            })
            .catch((err) => {
                console.log(err)
                return helper.response('error', res, null, 401, err)
            })
    },
    create: (req, res) => {
        let data = req.body
        data = JSON.parse(JSON.stringify(data))
        
        if (!req.file) {
            return helper.response('error', res, null, 401, 'image is required!')
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 4388608) {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 4MB')
        }

        data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
        model.city.create({ city: data.city_departure, country: data.country_departure })
            .catch((err) => {
                console.log(err.parent.sqlMessage)
            })
        model.city.create({ city: data.city_arrived, country: data.country_arrived })
            .catch((err) => {
                console.log(err.parent.sqlMessage)
            })

        model.ticket.create(data)
            .then((result) => {
                return helper.response('success', res, result, 200, 'created successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
     detail: (req, res) => {
         model.ticket.findAll({
             where: req.params
         })
             .then((result) => {
                 return helper.response('success', res, result, 200, 'get by id')
             })
             .catch((err) => {
                 helper.response('error', res, null, 401, err)
             })
     },
     transaction: (req, res) => {}
}
module.exports = tickets