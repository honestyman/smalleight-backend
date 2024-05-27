
const auth = require("../middleware/auth.js");

module.exports = app => {
  const tools = require("../controllers/tools.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/getdata', tools.getData);  
  router.post('/fetch-ogp', tools.getOgp);  


  app.use("/api/tools", router);
}