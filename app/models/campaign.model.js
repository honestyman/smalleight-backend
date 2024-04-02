module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define("campaign", {
    text: {
      type: Sequelize.STRING,
    },
  });

  return Campaign;
};
