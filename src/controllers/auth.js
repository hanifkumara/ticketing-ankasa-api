const {response} = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const model = require('../models/index')

exports.login = (req, res, next) => {
  const dataBody = req.body
  model.users.findAll({
    where: {
      email: dataBody.email
    }
  })
    .then((result) => {
      if (result.length > 0) {
        const user = result[0]
        bcrypt.compare(dataBody.password, user.password, function (err, resCheck) {
          if (!resCheck) return response('error', res, null, 401, { message: 'Password Wrong!!' })
          delete user.dataValues.password
          const payload = {
            userId: user.id,
            email: user.email,
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' }, function (err, token) {
            user.dataValues.token = token
            return response('success', res, {data: user, message: 'Login Success'}, 200, null)
          })

        })
      } else {
        return response('error', res, null, 401, { message: 'Email Not Found!!' })
      }
    })
    .catch(() => {
      return response('error', res, null, 500, { message: 'Internal Server Error' })
    })
}

exports.register = (req, res, next) => {
  const id = uuidv4()
  const dataBody = req.body
  model.users.findAll({
    where: {
      email: dataBody.email
    }
  })
  .then(result => {
    if (result.length > 0) return response('error', res, null, 401, 'Email Already Exist')
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(dataBody.password, salt, function (err, hash) {
        const data = {
          id,
          fullname: dataBody.fullname,
          photo: 'https://placekitten.com/230/230',
          email: dataBody.email,
          password: hash,
          createdAt: new Date,
          updatedAt: new Date
        }
        model.users.create(data)
          .then(result => {
            return response('success', res, {data: result, message: 'Register Success'}, 201, null)
          })
      })
    })
  })
  .catch(err => {
    return response('error', res, null, 500, {message: 'Internal Server Error'})
  })
}