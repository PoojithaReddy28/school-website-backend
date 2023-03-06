const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Media = sequelize.define("media", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });
};
return Media;
