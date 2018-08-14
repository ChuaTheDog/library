'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    title: DataTypes.TEXT,
    author: DataTypes.TEXT,
    genre: DataTypes.TEXT,
    first_published: DataTypes.INTEGER
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};