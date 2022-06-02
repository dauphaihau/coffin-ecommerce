const nodemailer = require('nodemailer');

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      secure: true,
    })

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}

exports.sendConfirmationEmail = function ({toUser, hash}) {
  const message = {
    from: process.env.EMAIL_USERNAME,
    to: toUser.email ,
    subject: 'Your App - Activate Account',
    html: `
      <h3> Hello ${toUser.username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
      <p>Cheers</p>
      <p>Your Application Team</p>
    `
  }

  return sendEmail(message);
}

exports.sendResetPasswordEmail = ({toUser, token}) => {
  const message = {
    from: process.env.EMAIL_USERNAME,
    to: toUser.email,
    subject: 'Customer account password reset',
    html: `
      <h3>Hello ${toUser.name} </h3>
      <p>To reset your password please follow this link: 
      <a target="_" href="${process.env.DOMAIN}/reset-password/?token=${token}&id=${toUser._id}">Reset Password Link</a></p>
      <p>Cheers,</p>
      <p>Drop Team</p>
    `
  }
  return sendEmail(message);
}
