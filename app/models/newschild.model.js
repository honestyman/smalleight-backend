module.exports = (sequelize, Sequelize) => {
  const NewsChild = sequelize.define("newschild", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING
    }
  });
  
  return NewsChild;
};
