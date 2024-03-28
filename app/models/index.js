const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect, 
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.company = require('./company.model.js')(sequelize, Sequelize);
db.pricesence = require('./pricesence.model.js')(sequelize, Sequelize);
db.solvedissue = require('./solvedissue.model.js')(sequelize, Sequelize);
db.expertise = require('./expertise.model.js')(sequelize, Sequelize);
db.tool = require('./tool.model.js')(sequelize, Sequelize);
db.industryexperience = require('./industryexperience.model.js')(sequelize, Sequelize);
db.startdate = require('./startdate.model.js')(sequelize, Sequelize);

// db.item = require('./item.model.js')(sequelize, Sequelize);
// db.like = require('./like.model.js')(sequelize, Sequelize);
// db.play = require('./play.model.js')(sequelize, Sequelize);
// db.download = require('./download.model.js')(sequelize, Sequelize);
// db.give = require('./give.model.js')(sequelize, Sequelize);
// db.statehistory = require('./statehistory.model.js')(sequelize, Sequelize);
// db.notification = require('./notification.model.js')(sequelize, Sequelize);

//associations
db.company.belongsTo(db.pricesence);

db.company.belongsToMany(db.solvedissue, { through: 'company_solvedissue' });
db.solvedissue.belongsToMany(db.company, { through: 'company_solvedissue' });

db.company.belongsToMany(db.expertise, { through: 'company_expertise' });
db.expertise.belongsToMany(db.company, { through: 'company_expertise' });

db.company.belongsToMany(db.tool, { through: 'company_tool' });
db.tool.belongsToMany(db.company, { through: 'company_tool' });

db.company.belongsToMany(db.industryexperience, { through: 'company_industryexperience' });
db.industryexperience.belongsToMany(db.company, { through: 'company_industryexperience' });

db.company.belongsTo(db.startdate);


// db.item.belongsTo(db.category);
// db.statehistory.belongsTo(db.user);

// db.user.hasMany(db.like);
// db.like.belongsTo(db.item);

// db.user.hasMany(db.play);
// db.play.belongsTo(db.item);

// db.user.hasMany(db.download);
// db.download.belongsTo(db.item);

// db.user.hasMany(db.give);
// db.give.belongsTo(db.item);


module.exports = db;
