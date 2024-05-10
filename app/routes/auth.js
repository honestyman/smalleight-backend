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


module.exports = router;
