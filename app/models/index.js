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

db.client = require('./client.model.js')(sequelize, Sequelize);
db.company = require('./company.model.js')(sequelize, Sequelize);
db.pricesence = require('./pricesence.model.js')(sequelize, Sequelize);
db.solvedissue = require('./solvedissue.model.js')(sequelize, Sequelize);
db.expertise = require('./expertise.model.js')(sequelize, Sequelize);
db.tool = require('./tool.model.js')(sequelize, Sequelize);
db.industryexperience = require('./industryexperience.model.js')(sequelize, Sequelize);
db.startdate = require('./startdate.model.js')(sequelize, Sequelize);

db.column = require('./column.model.js')(sequelize, Sequelize);
db.columnfirstchild = require('./columnfirstchild.model.js')(sequelize, Sequelize);
db.columnsecondchild = require('./columnsecondchild.model.js')(sequelize, Sequelize);
db.columncategory = require('./columncategory.model.js')(sequelize, Sequelize);


db.campaign = require('./campaign.model.js')(sequelize, Sequelize);
db.news = require('./news.model.js')(sequelize, Sequelize);
db.newschild = require('./newschild.model.js')(sequelize, Sequelize);
db.query = require('./query.model.js')(sequelize, Sequelize);
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

db.company.belongsToMany(db.campaign, { through: 'company_campaign' });
db.campaign.belongsToMany(db.company, { through: 'company_campaign' });

db.company.belongsTo(db.startdate);

db.column.belongsToMany(db.columnfirstchild, { through: 'column_firstchild' });
db.columnfirstchild.belongsToMany(db.columnsecondchild, { through: 'column_firstchild_secondchild' });

db.column.belongsToMany(db.columncategory, { through: 'column_columncategory' });
db.columncategory.belongsToMany(db.column, { through: 'column_columncategory' });

db.news.belongsToMany(db.newschild, { through: 'news_newschild' });






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
