module.exports = (sequelize, Sequelize) => {
  const Query = sequelize.define("query", {
    name: {
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    },
    questionContent:{
      type: Sequelize.STRING
    },
    kind:{
      type: Sequelize.STRING
    },
    isAnswer:{
      type: Sequelize.BOOLEAN
    },
  });
  
  return Query;
};
