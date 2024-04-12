const auth = require("../middleware/auth.js");

module.exports = app => {
  const columns = require("../controllers/columns.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', columns.getColumnsAll);
  router.get('/allcategory', columns.getColumnsCategoryAll);
  router.get('/onecolumn', columns.getOneColumn);
  router.post('/addcolumn', columns.addOneColumn);
  router.delete('/deleteonecolumn', columns.deleteOneColumn);

  // router.post('/updateintroduction', introductions.updateIntroduction);
  
  // router.post('/add', introductions.addIntroduction);
  // router.delete('/delete', introductions.deleteOneItem);  


  app.use("/api/columns", router);
}