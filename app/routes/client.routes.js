
const auth = require("../middleware/auth.js");

module.exports = app => {
  const client = require("../controllers/client.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', client.getAll);
  router.get('/getoneclient', client.getOneClient);
  router.post('/postquery', auth, client.addQuery);
  router.post('/postwanted', auth, client.addWantedCompany);

  // // router.get('/sendnotification', notification.sendNotification);
  
  // router.post('/updatenotification', notification.updateNotification);
  router.delete('/deleteoneclient', client.deleteOne);  


  app.use("/api/clients", router);
}