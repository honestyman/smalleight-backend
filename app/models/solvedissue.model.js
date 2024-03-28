module.exports = (sequelize, Sequelize) => {
  const Solvedissue = sequelize.define("solvedissue", {
    text: {
      type: Sequelize.STRING,
    },
    
  });

  return Solvedissue;
};
