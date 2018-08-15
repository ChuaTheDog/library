'use strict';
module.exports = (sequelize, DataTypes) => {
	var patrons = sequelize.define(
		'patrons',
		{
			first_name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'first name is required'
					}
				}
			},
			last_name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'last name is required'
					}
				}
			},
			address: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'address is required'
					}
				}
			},
			email: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: 'email is required'
					}
				}
			},
			library_id: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: 'library ID is required'
					}
				}
			},
			zip_code: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: 'zip_code is required'
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
	patrons.associate = function(models) {
		// associations can be defined here
		patrons.hasMany(models.loans);
	};
	return patrons;
};
