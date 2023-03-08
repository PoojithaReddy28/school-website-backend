const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.article = require("./article.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.media = require("./media.model")(sequelize, Sequelize);
db.tag = require("./tag.model")(sequelize, Sequelize);

db.user.hasMany(db.article, { as: "articles" });
db.article.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.tag.belongsToMany(db.article, {
  through: "article_tag",
  foreignKey: "tag_id",
  otherKey: "articleId",
});

db.article.belongsToMany(db.tag, {
  through: "article_tag",
  foreignKey: "article_id",
  otherKey: "tagId",
});

db.ROLES = ["user", "editor", "supervisor", "principal", "admin"];

module.exports = db;
