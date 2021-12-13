const dotenv = require('dotenv')
dotenv.config();

const sgMail = require('@sendgrid/mail')

const sendMail = async (mailOption, callback)=> {
const {subject , text, htmlContent} = mailOption;
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: process.env.MAIL_TO, // Change to your recipient
  from: process.env.MAIL_FROM, // Change to your verified sender
  subject: subject,
  text: text,
  html: htmlContent,
}
await sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
    callback(true)
  })
  .catch((error) => {
    console.error(error)
    callback(false)
  })

}


module.exports= sendMail;