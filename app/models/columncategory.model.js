module.exports = (sequelize, Sequelize) => {
  const ColumnCategory = sequelize.define("columncategory", {
    text: {
      type: Sequelize.STRING,
    }
  });

  return ColumnCategory;
};
