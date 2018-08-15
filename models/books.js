'use strict';
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
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: 'First Published is required'
					},
					isNumeric: {
						msg: 'not a number'
					}
				}
			}
		},
		{
			timestamps: false
		}
	);
	books.associate = function(models) {
		// associations can be defined here
		books.hasOne(models.books);
	};
	return books;
};
