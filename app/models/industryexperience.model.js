module.exports = (sequelize, Sequelize) => {
  const Industryexperience = sequelize.define("industryexperience", {
    text: {
      type: Sequelize.STRING,
    }
  });

  return Industryexperience;
};
