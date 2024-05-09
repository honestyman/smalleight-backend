module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    count: {
      type: Sequelize.INTEGER,
    },
 
  });

  return Like;
};
