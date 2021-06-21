var mailer = require("nodemailer");

const mailConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

var transporter = mailer.createTransport(mailConfig);

module.exports = transporter;
