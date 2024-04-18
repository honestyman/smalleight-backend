module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    image: {
      type: Sequelize.STRING,
    },
    title:{
      type: Sequelize.STRING,
    },
    contents:{
      type: Sequelize.TEXT,
    }
  });
  
  return News;
};
