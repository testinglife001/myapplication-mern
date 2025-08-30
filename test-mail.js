// test-mail.js
// import { sendEmail } from './utils/nodemailer.js';

// const sendEmail = require("./utils/nodemailer"); // no {}
const { sendEmail } = require("./utils/nodemailer");


(async () => {
  try {
    const result = await sendEmail(
      'your_test_email@gmail.com',
      'Test OAuth Email',
      '<h1>Hello from Nodemailer OAuth2!</h1>'
    );
    console.log("Email sent:", result.response);
  } catch (err) {
    console.log(err);
  }
})();
