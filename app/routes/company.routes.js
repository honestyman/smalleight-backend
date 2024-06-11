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

  app.use("/api/companys", router);
}