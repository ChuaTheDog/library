'use strict';
module.exports = (sequelize, DataTypes) => {
  var patrons = sequelize.define('patrons', {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    email: DataTypes.TEXT,
    library_id: DataTypes.TEXT,
    zip_code: DataTypes.INTEGER
  }, {});
  patrons.associate = function(models) {
    // associations can be defined here
  };
  return patrons;
};