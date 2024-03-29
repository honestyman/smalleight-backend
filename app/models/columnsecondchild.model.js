module.exports = (sequelize, Sequelize) => {
  const ColumnSecondChild = sequelize.define("columnsecondchild", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    }
  });
  
  return ColumnSecondChild;
};
