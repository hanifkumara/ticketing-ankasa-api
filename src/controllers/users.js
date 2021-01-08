const { response } = require('../helpers/helpers')
const model = require('../models/index')

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
  if (req.fileValidationError) {
    return response('error', res, null, 401, { message: 'Only image are allowed' })
  }
  if (req.file) {
    console.log(req.fileValidationError)
    if (req.file.size > 1000024) {
      return response('error', res, null, 401, { message: 'File too long. Maximum file 1 MB' })
    } else {
      data.photo = `${process.env.BASE_URL}/images/${req.file.filename}`;
    }
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