module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    publishDate: {
      type: Sequelize.DATE,
    },
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
