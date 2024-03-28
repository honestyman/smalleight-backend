module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    establishedYear: {
      type: Sequelize.INTEGER
    },
    representativeName: {
      type:Sequelize.STRING
    },
    memberCount: {
      type:Sequelize.STRING
    },
    sales:{
      type:Sequelize.INTEGER
    },
    title:{
      type:Sequelize.STRING
    },
    description:{
      type:Sequelize.STRING
    }
  });

  return Company;
};
