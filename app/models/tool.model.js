module.exports = (sequelize, Sequelize) => {
  const Tool = sequelize.define("tool", {
    text: {
      type: Sequelize.STRING,
    },
 
  });

  return Tool;
};
