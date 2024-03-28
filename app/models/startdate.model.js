module.exports = (sequelize, Sequelize) => {
  const Startdate = sequelize.define("startdate", {
    text: {
      type: Sequelize.STRING,
    },
  });

  return Startdate;
};
