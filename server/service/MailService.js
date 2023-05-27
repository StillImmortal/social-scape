import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })


export const sendActivationMail = async (to, link) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'immortallatrommi22@gmail.com',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken
      }
    })

    const mailOptions = {
      from: 'immortallatrommi22@gmail.com',
      to,
      subject: 'CONFIRMATION AUTHENTICATION',
      text: '',
      html: `<div>
              <h1>Для активаци пройдите по ссылке</h1>
              <a href=${link}>${link}</a>
            </div>`
    }

   await transport.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}