'use strict';

module.exports = (sequelize, DataTypes) => {
	var loans = sequelize.define(
		'loans',
		{
			patron_id: DataTypes.INTEGER,
			loaned_on: DataTypes.DATE,
			return_by: DataTypes.DATE,
			returned_on: DataTypes.DATE
		},
		{
			timestamps: false,
			underscored: true
		}
	);
	loans.associate = function(models) {
		// associations can be defined here
		loans.belongsTo(models.books, {
			foreignKey: 'book_id',
			constraints: false
		});
		loans.belongsTo(models.patrons, {
			foreignKey: 'patron_id',
			constraints: false
		});
	};
	return loans;
};
