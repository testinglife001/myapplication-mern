const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require('dotenv');
dotenv.config(); // ✅ load env first

// Load ENV vars
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * Sends a verification email with given link
 * @param {string} to - recipient email
 * @param {string} subject - subject line
 * @param {string} html - HTML body
 */
const sendMail = async (to, subject, html) => {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();
    const { token } = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        // accessToken: accessToken.token,
        accessToken: token, // 👈 safe
      },
    });

    const mailOptions = {
      from: `My App <${SENDER_EMAIL}>`,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("sendMail error:", error);
    throw error;
  }
};

module.exports = sendMail;
