const { response } = require('../helpers/helpers')
const model = require('../models/index')
const fs = require('fs')

exports.getUsers = async (req, res, next) => {
  try {
    const reultAll = await model.users.findAll()
    console.log(reultAll)
    reultAll.map(value => {
      delete value.password
      console.log('ini valuenya', value.password)
    })
    return response('success', res, reultAll, 200, null)
  } catch (error) {
    return response('error', res, null, 500, { message: 'Internal Server Error!!' })
  }
}
exports.getMyProfile = async (req, res, next) => {
  try {
    const { myId } = req
    const resultFindOne = await model.users.findOne({ where: { id: myId } })
    delete resultFindOne.dataValues.password
    return response('success', res, resultFindOne, 200, null)
  } catch (error) {
    return response('error', res, null, 500, { message: 'Internal Server Error!!' })
  }
}
exports.updateProfile = async (req, res, next) => {
  const { myId } = req
  const { fullname, phone, gender, city, country, email } = req.body
  const data = {}
  if (fullname) {
    data.fullname = req.body.fullname
  }
  if (!req.file) {
    data.updatedAt = new Date()
  }
  else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
    const path = `./images/${req.file.filename}` //the location of the images to be deleted
    // delete the images
    fs.unlinkSync(path)
    return response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
  }
  else if (req.file.size >= 2388608) {
    const path = `./images/${req.file.filename}` //the location of the images to be deleted
    // delete the images
    fs.unlinkSync(path)
    return response('error', res, null, 401, 'Image size is too large, it must be under 2MB')
  } else {
    data.photo = `${process.env.BASE_URL}/images/${req.file.filename}`
    // process delete image on folder server
    model.users.findAll({
      attributes: ['id', 'photo'],
      where: { id: myId }
    })
      .then((result) => {
        const images = result[0].dataValues.photo
        if (images !== 'https://placekitten.com/230/230') {
          const pict = images.split('/')[4]
          const path = `./images/${pict}`
          fs.unlinkSync(path)
        }
      })
  }
  if (phone) {
    data.phone = req.body.phone
  }
  if (gender) {
    data.gender = req.body.gender
  }
  if (city) {
    data.city = req.body.city
  }
  if (country) {
    data.country = req.body.country
  }
  if (email) {
    data.email = req.body.email
  }
  data.updatedAt = new Date()
  console.log('ini datanya', data)

  try {
    await model.users.update(data, {where: {id: myId}})
    return response('success', res, { data, message: 'Update Success'}, 200, null)
  } catch (error) {
    return response('error', res, null, 500, error)
  }
}