const auth = require("../middleware/auth.js");

module.exports = app => {
  const companys = require("../controllers/company.controller.js");
  
  var router = require("express").Router();

  // Retrieve all campaigns
  router.get('/', companys.getCompanyAll);
  // router.get('/price', companys.getPriceAll);
  router.post('/answers', auth, companys.processAnswers);
  router.post('/selected_companise', auth, companys.addSelectedCompanies);
  router.post('/add_selected_onecompany', auth, companys.addSelectedOneCompany);
  router.post('/add_selected_multifulcompany', auth, companys.addSelectedMultifulCompany);
  router.post('/answers_tool', companys.processAnswersTool);
  router.get('/onecompany', companys.getOneCompany);
  router.get('/selected_company', companys.getSelectedCompany);
  router.delete('/deleteonecompany', companys.deleteOneCompany);

  router.get('/allcampaign', companys.getCampaignAll);
  router.get('/allexpertise', companys.getExpertiseAll);
  router.get('/alltools', companys.getToolsAll);
  router.get('/allsolvedissue', companys.getSolvedissueAll);
  router.get('/allpricesence', companys.getPricesenceAll);
  router.get('/allstartdate', companys.getStartDateAll);
  router.get('/allindustryexperience', companys.getIndustryExperienceAll);

  router.post('/addcompany', companys.addCompany);
  router.post('/updatecompany', companys.updateCompany);
  // router.get('/getlike', items.getLike);
  // router.get('/getonelike', items.getOneLike);
  // router.get('/getplay', items.getPlay);
  // router.get('/getdownload', items.getDownload);
  // router.post('/download', items.addDownload);
  // router.post('/play', items.addPlays);
  // router.get('/search', items.getContentSearch);
  // router.get('/en_search', items.getEnContentSearch);
  // router.get('/category_search', items.getCategorySearch);
  // router.get('/tab_search', items.getTabSearch);
  // router.post('/addgive', items.addGive);

  // -------admin----------
  // router.post('/additem_video', items.addItemVideo);
  // router.post('/additem_sound', items.addItemSound);
  // router.post('/updateitem_video', items.updateItemVideo);
  // router.post('/updateitem_sound', items.updateItemSound);
  // router.post('/addtab', items.addTab);
  // router.get('/getoneitem', items.getOneItem);
  // router.delete('/deleteoneitem', items.deleteOneItem);
  // router.delete('/deletetag', items.deleteTag);
  // router.get('/getalltags', items.getAllTags);
  // router.get('/getonetag', items.getOneTag);
  // router.post('/updatetag', items.updateTag);

  // router.get('/getcategory', items.getAllCategory);

  app.use("/api/companys", router);
}