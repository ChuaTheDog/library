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
					},
					len: {
						args: [2, 4],
						msg: 'too many characters'
					} // only allow values with length between 2 and 10
				}
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
