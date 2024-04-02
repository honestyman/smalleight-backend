
module.exports = app => {
  const news = require("../controllers/news.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', news.getNewsAll);
  router.get('/onenews', news.getOneNews);
  

  app.use("/api/news", router);
}