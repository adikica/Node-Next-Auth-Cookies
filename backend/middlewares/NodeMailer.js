// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "aaaaaaaaa.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "aaaaaaa@aaaaaaaaa.com", // generated ethereal user
    pass: "aaaaaaaaa@aaaaaaa", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"NodeJs & Nodemailer" <aaaaaaa@aaaaaaaaaaaa.com>', // sender address
  to: "aaaaaaaaa@gmail.com", // list of receivers
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
