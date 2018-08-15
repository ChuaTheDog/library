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
	loans.associate = function(models) {};
	return loans;
};
