// begin send mail
const output = `
<p>Ju keni nje email te ri nga X server</p>
<h3>Detajet e Emailit</h3>
<ul>  
  <li>Name: ${req.body.fullName}</li>
  <li>Email: ${req.body.email}</li>
 
</ul>
<h3>Message</h3>
`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "aaaaaaaaaa.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "aaaaa@aaaaaa.com", // generated ethereal user
    pass: "aaaaaaaa@aaaaaa", // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"NodeJs & Nodemailer" <aaaaa@aaaaaaaaa.com>', // sender address
  to: "aaaaaa1@gmail.com", // list of receivers
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

// end send mail
