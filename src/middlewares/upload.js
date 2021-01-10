const multer = require('multer')
const path = require('path')
const model = require('../models/index')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: async function (req, file, cb) {
        const {myId} = req
        try {
            const result = await model.users.findOne({ where: { id: myId } })
            if (result.dataValues.photo !== 'https://placekitten.com/230/230') {
                const filePath = result.dataValues.photo.split('/')[4]
                console.log(filePath)
                fs.unlinkSync(`images/${filePath}`)
            }
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
        } catch (error) {
            console.log(error)
        }
    }
})

const upload = multer({ storage: storage, 
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname).toLocaleLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            req.fileValidationError = "Forbidden extension";
            console.log('whats is this', req.fileValidationError)
            return callback(null, false, req.fileValidationError);
        }
        callback(null, true)
    }
})
module.exports = {
    uploadMulter: upload
}