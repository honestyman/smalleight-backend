const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const db = require('../models');
const Op = db.Sequelize.Op;
const User = db.user;

// @route       POST api/user
// @desc        Register a user
// @access      Public
router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a Passowrd with 6 or more charcters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }
    const { name, email, password, country } = req.body;
    try {
      let user = await User.findOne({ 
        where: {
          email: email
        }
      });
      if (user) {
        return res.status(400).json("User Already Exists");
      }

      user = {
        name: name,
        email: email,
        password: password,
        country: country
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user = await User.create(user);

      const payload = {
        user: {
          id: user.id,
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
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
