module.exports = (sequelize, Sequelize) => {
  const ColumnFisrtChild = sequelize.define("columnfirstchild", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image:{
      type: Sequelize.STRING,
    },
    alt: {
      type: Sequelize.STRING,
    }
  });
  
  return ColumnFisrtChild;
};
