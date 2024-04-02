const express = require("express");
require('dotenv').config();
const router = express.Router();
const { AUTH }=require("../config/app.config");
const config = require("config");
const nodemailer = require("nodemailer");
const adminauth = require("../middleware/adminauth");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.post("/", adminauth, async (req, res) => {

  try {
    console.log(AUTH.ADMIN_NAME, AUTH.ADMIN_PASSWORD);
    if(req.body.adminName!=AUTH.ADMIN_NAME){
      return res.status(400).json({
        message:"username is valid"
      });  
    }
    if(req.body.password!=AUTH.ADMIN_PASSWORD){
      return res.status(400).json({
        message:"Password is valid"
      });  
    }
    const payload={
      admin:{
        name:req.body.adminName,
        password:req.body.password
      }
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ 
      message: err.message
     });
  }
});

// @route       POST api/auth
// @desc        Auth user & get Token
// @access      Public


// router.post('/forget_password',
//   [
//     check("email", "Please include a valid Email").isEmail()
//   ],
//   async (req, res) => {
//     //  console.log("======>",req.body);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(errors.array()[0].msg);
//     }
//     try {
//       let user = await User.findOne({
//         where: {
//           email: req.body.email
//         }
//       });

//       if (!user) {
//         return res.status(400).json("The email is incorrect.");
//       }
//       console.log(user);
//       // var charSet = '0123456789';
//       // var randomString = '';
//       // for (var i = 0; i < 6; i++) {
//       //     var randomPoz = Math.floor(Math.random() * charSet.length);
//       //     randomString += charSet.substring(randomPoz,randomPoz+1);
//       // }
//       // console.log(randomString);
//       // await User.update({ notification: req.body.notification }, {
//       //   where: {
//       //     email: req.body.email
//       //   }
//       // });
//       // user.verifycode=randomString;
//       // user.save();

//       const payload = {
//         user: {
//           id: user.id
//         }
//       };
//       const token = jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         {
//           expiresIn: 360000
//         }
//       );

//       try {
//         const transpoter = nodemailer.createTransport({
//           host: process.env.EMAIL_HOST,
//           port: process.env.EMAIL_PORT,
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASSWORD,
//           },
//         });
//         const mailContigrations = {
//           from: process.env.FROM_EMAIL,
//           to: user.email,
//           subject: 'Email Verification - GASSHO',
//           text: `こんにちは。
//                 パスワードを変更するには、次のリンクをクリックしてください。
//                 ${process.env.BASE_URL}/verify/${user.id}/${token}\n
//                 GASSHO`
//         };
  
//         transpoter.sendMail(mailContigrations, function (error, info) {
//           if (error) throw Error(error);
//           console.log('Email Sent Successfully');
//           config.log(info);
//         });
//         config.log("result:", transpoter);
//       } catch (error) {
//         console.log('mail sending error>>>', error);
//       }

//       return res.status(200).json({ message: "success" });
//     } catch (error) {
//       res.status(500).send({ message: "Server Error" });
//     }
//   }
// );


module.exports = router;
