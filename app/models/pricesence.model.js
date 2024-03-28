module.exports = (sequelize, Sequelize) => {
  const Pricesence = sequelize.define("pricesence", {
    text: {
      type: Sequelize.STRING,
    },
  });

  return Pricesence;
};
