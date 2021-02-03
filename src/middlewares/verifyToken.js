const jwt = require('jsonwebtoken')
const {response} = require('../helpers/helpers')

exports.verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) return response('error', res, null, 401, {message: 'You Not Have Token!'})
  let token = authorization.split(' ')
  token = token[1]
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err) {
      if (err.name === 'JsonWebTokenError') {
        return response('error', res, null, 401, { message: 'Invalid Token' })
      } else if (err.name === 'TokenExpiredError') {
        return response('error', res, null, 401, { message: 'Token Expired' })
      }
    }
    req.myId = decoded.userId
    req.myEmail = decoded.email
    next()
  })  
}