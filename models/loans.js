'use strict';

module.exports = (sequelize, DataTypes) => {
	var loans = sequelize.define(
		'loans',
		{
			patron_id: DataTypes.INTEGER,
			loaned_on: DataTypes.DATEONLY,
			return_by: DataTypes.DATEONLY,
			returned_on: DataTypes.DATEONLY
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
