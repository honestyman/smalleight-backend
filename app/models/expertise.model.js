module.exports = (sequelize, Sequelize) => {
  const Expertise = sequelize.define("expertise", {
    text: {
      type: Sequelize.STRING,
    },
 
  });

  return Expertise;
};
