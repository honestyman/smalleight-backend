module.exports = (sequelize, Sequelize) => {
  const WantedCompany = sequelize.define("wantedcompany", {
    companyName: {
      type: Sequelize.STRING
    },
    companyEmail:{
      type: Sequelize.STRING
    },
    officialPosition: {
      type: Sequelize.STRING
    },
    phoneNumber:{
      type: Sequelize.STRING
    },
    publishForm:{
      type: Sequelize.STRING
    }
  });
  
  return WantedCompany;
};
