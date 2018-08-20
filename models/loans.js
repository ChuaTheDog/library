'use strict';

module.exports = (sequelize, DataTypes) => {
	var loans = sequelize.define(
		'loans',
		{
			patron_id: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: 'address is required'
					}
				}
			},
			loaned_on: {
				type: DataTypes.DATEONLY,
				validate: {
					notEmpty: {
						msg: 'Loan date is required'
					}
				}
			},
			return_by: {
				type: DataTypes.DATEONLY,
				validate: {
					notEmpty: {
						msg: 'Return date is required'
					},
					isDate: {
						msg: 'is not a date'
					}
				}
			},
			returned_on: {
				type: DataTypes.DATEONLY,
				validate: {
					notEmpty: {
						msg: 'Returned on date is required'
					}
				}
			}
		},
		{
			timestamps: false,
			underscored: true
		}
	);
	loans.associate = function(models) {
		loans.belongsTo(models.books, { foreignKey: 'book_id' });
		loans.belongsTo(models.patrons, { foreignKey: 'patron_id' });
	};
	return loans;
};
