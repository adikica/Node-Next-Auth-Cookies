// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "kaltersia.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "adi@kaltersia.com", // generated ethereal user
    pass: "Tralala@666", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"NodeJs & Nodemailer" <adi@kaltersia.com>', // sender address
  to: "adikica91@gmail.com", // list of receivers
  subject: "Regjistrim i ri", // Subject line
  text: "Hello world?", // plain text body
  html: output, // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Mesazhi u dergua: %s", info.messageId);
});

module.exports = {
  transporter,
  mailOptions,
};
