import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const GOOGLE_CLIENT_ID = '527580251270-q94mhs216nkormnj1k2shdg3qa1guo9t.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//042zkWAzGxYPKCgYIARAAGAQSNwF-L9IrZkE53VOq9TygOTYr2A_nSKtt6R7sBgju9KLe4RKMnuRxEP_C9lypZrPuMrVSzihp9a8'

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })


export const sendActivationMail = async (to, link) => {
  try {
    const accessToken = oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'immortallatrommi22@gmail.com',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken
      }
    })

    const mailOptions = {
      from: 'immortallatrommi22@gmail.com',
      to,
      subject: 'Hello from gmail using API',
      text: "Confirm Auth",
      html: `<div>
              <h1>Для активаци пройдите по ссылке</h1>
              <a href=${link}>${link}</a>
            </div>`
    }

    const response = await transport.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}