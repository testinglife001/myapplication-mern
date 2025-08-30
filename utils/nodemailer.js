// utils/nodemailer.js
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require('dotenv');
dotenv.config(); // ✅ load env first

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // redirect URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const sendEmail = async (to, subject, html) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const mailOptions = { from: `Blog App <${process.env.GMAIL_USER}>`, to, subject, html };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log("Nodemailer OAuth Error:", err);
    throw err;
  }
};

module.exports.sendEmail = sendEmail;

