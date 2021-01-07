const { response } = require('../helpers/helpers')
const model = require('../models/index')

exports.getUsers = (req, res, next) => {
  const {myId} = req
  console.log('ini id login', myId)
  model.users.findAll()
  .then(result => {
    console.log(result)
    result.map(value => {
      delete value.password
      console.log('ini valuenya', value.password)
    })
    return response('success', res, result, 200, null)
  })
  .catch(() => {
    return response('error', res, null, 500, { message: 'Internal Server Error!!' })
  })
}