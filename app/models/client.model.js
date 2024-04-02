module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    name: {
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    },
    phoneNumber:{
      type: Sequelize.STRING
    },
    questionContent:{
      type: Sequelize.STRING
    },
    service:{
      type: Sequelize.STRING
    },
    purpose:{
      type: Sequelize.STRING
    },
    measures:{
      type: Sequelize.STRING
    },
    currentMeasures:{
      type: Sequelize.STRING
    },
    measures:{
      type: Sequelize.STRING
    },
    tools:{
      type:Sequelize.STRING
    },
    startDate:{
      type:Sequelize.STRING
    },
    budget:{
      type:Sequelize.STRING
    },
    selectedCompany:{
      type:Sequelize.STRING
    }
  });
  
  return Client;
};
