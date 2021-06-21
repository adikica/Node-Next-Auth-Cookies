//http://localhost:5001/api/users
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

//import middlewares
//const { transporter } = require("../middlewares/NodeMailer");
var transporter = require("../middlewares/Node-Mailer");
//require User Nga models Schema
const User = require("../models/User");

//begin image upload

var userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var userUpload = multer({ storage: userStorage });

//end image upload

//Regjistro Perdorues
// Route http://localhost:5001/api/users/register
//method POST
router.post("/register", userUpload.single("image"), async (req, res) => {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  // console.log(req.body);
  // console.log(req.file);
  const exist = await User.exists({ email: req.body.email });
  if (exist) {
    return res.status(201).json({ message: "ky email eshte i regjistruar" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPass,
      image: req.file.filename,
    });

    const savedUser = await newUser.save();

    res.status(200).json({ message: "Perdoruesi u Regjistrua me Sukses" });
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

 

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"NodeJs & Nodemailer" <someMail@SomeDomain.com>', // sender address
      to: "receiver@Email.address", // list of receivers
      subject: "Regjistrim i ri", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //Error
        return console.log(error);
      } else {
        //Success
        console.log("Mesazhi u dergua: %s", info.messageId);
      }
    });
    // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("Mesazhi u dergua: %s", info.messageId);
    // });
    return;
    // end send mail
  } catch (err) {
    console.log(err);
  }
});

//Identifiko Perdorues
// Route http://localhost:5001/api/users/login
//method POST
router.post("/login", async (req, res) => {
  try {
    // kontrollojme ne database nese kemi nje perdorues me email qe na vjen nga forma
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res
        .status(404)
        .json({ message: "Ky email Nuk Egziston ne database" });
    }

    //nese kemi nje user
    //do kontrollojme nese  req.body.password === user.password
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(404).json({ message: "Kredinciale te gabuara" });
    }

    //krijojme token per ta derguar ne clint browser header
    const token = jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      process.env.SEC_RET
    );

    //dergojme cookie ne browser
    res.cookie("jwt", token, { http: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({ message: "identifikimi u krye me sukses" });
  } catch (err) {
    console.log(err);

    res.status(501).json({ message: "dicka shkoi keq, provoni perseri" });
  }
});

//Dergo te dhenat e  Perdoruesit ne frontend
// Route http://localhost:5001/api/users/user
//method GET
router.get("/user", async (req, res) => {
  //console.log("backend get user", req.cookies);
  try {
    //pasijme cookie qe marrim nga frontend ne nje constance
    const biskotat = req.cookies["jwt"];
    //verifikojme  cookie duke perdorur fjalen sekrete qe kemi perdorur kur e kemi krijuar
    const verifiko = jwt.verify(biskotat, process.env.SEC_RET);
    if (!verifiko) {
      res.status(501).json({ message: "dicka shkoi keq, provoni perseri" });
    }
    const user = await User.findOne({ _id: verifiko._id })
      .select("-password")
      .lean();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "dicka shkoi keq, provoni perseri" });
  }
});

//Log Out User
// Route http://localhost:5001/api/users/logout
//method GET
router.get("/logout", (req, res) => {
  // //dergojme cookie ne browser
  //res.cookie("jwt", token, { http: true, maxAge: 24 * 60 * 60 * 1000 });
  res.cookie("jwt", " ", { maxAge: 0 });
  res.status(201).json({ message: "beret logout me sukses" });
});

//Edit single user data
// Route http://localhost:5001/api/users/edit/:id
//method PUT

router.put("/edit/:id", async (req, res) => {
  console.log(req.body);
  try {
    const updatedUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      //image: req.file.filename,
    };
    //nese njekohesisht do kishim dhe nje vlere tjeter
    // if (req.file) {
    //   const img = req.file.filename;
    //   updatedUser.image = img;
    // }

    let query = {
      _id: req.params.id,
    };

    const doTheUpdate = await User.findOneAndUpdate(query, updatedUser);
    if (doTheUpdate) {
      res.status(201).json({ message: "te dhenat u perditesuan" });
    } else {
      res.status(201).json({ message: "Perditesimi i te dhenave deshtoi" });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // //pasijme cookie qe marrim nga frontend ne nje constance
  // const biskotat = req.cookies["jwt"];
  // //verifikojme  cookie duke perdorur fjalen sekrete qe kemi perdorur kur e kemi krijuar
  // const verifiko = jwt.verify(biskotat, process.env.SEC_RET);

  // const userEdit = await User.findById(req.params.id);
  // console.log(req.body);
  // console.log("userEdit", userEdit.password);
  // console.log("verifiko", verifiko._id);
  // console.log("req.params.id", req.params.id);

  // try {
  //   const updatedUser = await User.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: req.body,
  //     },
  //     { new: true }
  //   );
  //   console.log(updatedUser);
  //   res.status(201).json({ message: "te dhenat u perditesuan" });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

//Delete single user
// Route http://localhost:5001/api/users/delete/:id
//method delte
router.delete("/delete/:id", async (req, res) => {
  //const {} = req.body

  try {
    // kontrollojme ne database nese kemi nje perdorues me email qe na vjen nga forma
    const user = await User.findOne({ _id: req.params.id }).lean();
    if (!user) {
      return res.status(404).json({ message: "dicka shkoi keq" });
    }

    //nese kemi nje user

    //do kontrollojme nese  req.body.password === user.password
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(404).json({ message: "Kredinciale te gabuara" });
    }
    //nje veprim parase te fshim perdoruesin
    //do fshinim te gjithe psotimet qe i perkasin atij perdoruesi
    //const deleteAllPostsFromUSer = await Post.deleteMany()

    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

    //dergojme cookie ne browser
    return res.cookie("jwt", " ", { http: true, maxAge: 0 });

    // .then(res.cookie("jwt", " ", { maxAge: 0 }))
    // .catch((err) => res.status(404).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user password
router.put("/edit/pass/:id", async (req, res) => {
  //
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
  } catch (err) {}
});

// user forgot and reset password
// Route http://localhost:5001/api/users/forgot-password
router.put("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ error: "User with that email does not exist" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
    expiresIn: "10m",
  });

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "kaltersia.com",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "adi@kaltersia.com", // generated ethereal user
  //     pass: "Tralala@666", // generated ethereal password
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Password reset link",
    html: `
        <h4>Please use the following link to reset your password:</h4>
        <p>${process.env.CLIENT_URL}/users/auth/password/reset/${token}</p>
        <hr/>
        <p>This email may contain sensitive information</p>
        <a href="https://website.com">https://website.com</a>
    `,
  };
  //RUAJME TOKEN NE DATABASE
  return user.updateOne({ resetPasswordLink: token }, (err, success) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    } else if (success) {
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //Error
          return console.log(error);
        } else {
          //Success
          console.log("Mesazhi u dergua: %s", info.messageId);
        }
      });
    } else {
      //else
      console.log("try again");
    }
  });
});

// user  reset password
// Route http://localhost:5001/api/users/reset-password
router.put("/reset-password", async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  // check if you have the reset password
  // verify if the token has expired
  const decoded = jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD);
  if (!decoded) {
    return res.status(401).json({ error: "Expired link. Try again" });
  }

  // find the user based on reset password link
  const user = await User.findOne({ resetPasswordLink });
  if (!user) {
    return res.status(401).json({ error: "Something went wrong. Try later" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(newPassword, salt);
  // update user fields
  const updatedFields = {
    password: hashPass,
    resetPasswordLink: "",
  };
  console.log(user);

  let query = {
    _id: user._id,
  };

  // const doTheUpdate = await User.findOneAndUpdate(query, updatedUser);

  const updatedUser = await User.findOneAndUpdate(query, updatedFields);
  //user = _.extend(user, updatedFields); // update fields that have changed
  console.log(updatedUser);
  // save user with updated information
  const saveduser = await updatedUser.save();
  if (!saveduser) {
    return res.status(401).json({ error: "Something went wrong" });
  }

  return res.json({
    message: `Great! Now you can login with your new password`,
  });
});

module.exports = router;
