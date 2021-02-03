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
      subject: 'Reset Password',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    .container{
      text-align: center;
      padding: 30px 0;
    }
    a{
      text-decoration: none;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      background-color: rgb(166, 166, 243);
      color: white;
      cursor: pointer;
      width: fit-content;
    }
    a:hover{
      transform: scale(1.04);
      background-color: rgb(135, 135, 202);
    }
    a:focus{
      outline: none
    }
  </style>
</head>
<body>
  <div class="container">
    <h4>Please click this button for reset your Password</h4>
    <a href='${url}'>Reset Password</a>
  </div>
</body>
</html>`
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