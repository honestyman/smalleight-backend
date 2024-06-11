const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.js");

module.exports = app => {
  const users = require("../controllers/users.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/getall', users.getAll);

  app.use("/api/users", router);
}