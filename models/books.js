'use strict';
var Sequelize = require('sequelize');

var sequelizePagination = require('sequelize-paginate-cursor');

module.exports = (sequelize, DataTypes) => {
	var books = sequelize.define(
		'books',
		{
			title: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'Title is required'
					}
				}
			},
			author: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'Author is required'
					}
				}
			},
			genre: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'Genre is required'
					}
				}
			},
			first_published: {
				type: DataTypes.INTEGER
			}
		},
		{
			timestamps: false,
			underscored: true
		}
	);
	books.associate = function(models) {
		books.hasOne(models.loans);
	};
	return books;
};
