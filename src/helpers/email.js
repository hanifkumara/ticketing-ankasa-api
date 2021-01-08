const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PW_EMAIL
  }
})
exports.sendEmail = (email, url) => {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.EMAIL, // sender address
      to: email,
      subject: 'Hallo',
      html: `<a href='${url}'>Bismillah</a>`
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    }
    )
  })
}