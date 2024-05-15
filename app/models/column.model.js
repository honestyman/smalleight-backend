module.exports = (sequelize, Sequelize) => {
  const Column = sequelize.define("column", {
    thumbnail: {
      type: Sequelize.STRING,
    },
    alt: {
      type: Sequelize.STRING,
    },
    title:{
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    }
  });
  
  return Column;
};
