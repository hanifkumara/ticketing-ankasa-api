const model = require('../models/index')
const helper = require('../helpers/helpers')

const cities = {
    view: (req, res) => {
        model.city.findAll()
            .then((result) => {
                return helper.response('success', res, result, 200, 'get cities successfully')
            })
            .catch((err) => {
                console.log(err)
                return helper.response('error', res, null, 401, err)
            })
    }
}
module.exports = cities