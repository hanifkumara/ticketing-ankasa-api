const {response} = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const model = require('../models/index')
const { sendEmail } = require('../helpers/email')

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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const resEmail = await model.users.findOne({ where: { email } })
    if (!resEmail) {
      return response('error', res, null, 401, { message: 'Email Not Found' })
    } else {
      console.log('ini idnya', resEmail.id)
      jwt.sign({ myId: resEmail.id }, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, emailToken) => {
        const url = `${process.env.FRONTEND_URL}/auth/createnewpass/${emailToken}`;
        sendEmail(email, url)
        return response('success', res, { token: emailToken, message: 'Send email success. Pelase check your email now' }, 201, null)
      })
    }
  } catch (error) {
    return response('error', res, null, 500, {message: 'Internal Server Error'})
  }
}
exports.resetPassword = (req, res, next) => {
  try {
    const {password} = req.body
    console.log(password)
    const authorization = req.headers.authorization
    if (!authorization) return response('error', res, null, 401, { message: 'You Not Have Token!' })
    let token = authorization.split(' ')
    token = token[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return response('error', res, null, 401, { message: 'Invalid Token' })
        } else if (err.name === 'TokenExpiredError') {
          return response('error', res, null, 401, { message: 'Token Expired' })
        }
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          model.users.update({password: hash}, { where: { id: decoded.myId } })
            .then(() => {
              console.log(decoded)
              return response('success', res, { message: 'Reset Password Success' }, 201, null)
            })
        })
      })
      console.log(decoded)
    })
  } catch (error) {
    return response('error', res, null, 500, error)
  }
}