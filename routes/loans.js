var express = require('express');
var router = express.Router();
var Loan = require('../models').loans;
var Book = require('../models').books;
var Patron = require('../models').patrons;

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var moment = require('moment');

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	var sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// gets the current date and formats it

/* GET loans listing. */
router.get('/', function(req, res, next) {
	sequelize
		.query(
			'SELECT title, first_name, last_name, loaned_on, return_by, returned_on FROM loans INNER JOIN books on loans.book_id = books.id INNER JOIN patrons on loans.patron_id = patrons.id',
			{ type: sequelize.QueryTypes.SELECT }
		)

		.then(loans => {
			// We don't need spread here, since only the results will be returned for select queries
			res.render('all_loans', { loans: loans });
			//res.send(loans);
		});
});

/* GET loans listing. */
router.get('/new_loan', function(req, res, next) {
	sequelize
		.query(
			'SELECT * FROM books LEFT JOIN loans ON books.id = loans.book_id WHERE loans.book_ID IS NULL',
			{ type: sequelize.QueryTypes.SELECT }
		)

		.then(loans => {
			// We don't need spread here, since only the results will be returned for select queries
			res.render('new_loan', { loans: loans });
			//res.send(loans);
		});
});

/* GET overdue listing. */
router.get('/overdue_loans', function(req, res, next) {
	var currentDate = moment()
		.format()
		.toString()
		.substring(0, 10);
	var dueDate = moment()
		.add(7, 'd')
		.format('YYYY-MM-DD')
		.toString()
		.substring(0, 10);
	console.log(dueDate);
	sequelize
		.query(
			'SELECT * FROM books LEFT JOIN loans ON books.id = loans.book_id WHERE return_by >= ' +
				dueDate +
				' AND returned_on IS NULL',
			{ type: sequelize.QueryTypes.SELECT }
		)

		.then(loans => {
			// We don't need spread here, since only the results will be returned for select queries
			//	res.render('new_loan', { loans: loans });
			res.send(loans);
		});
});
module.exports = router;
/*
GET ALL TITELS AVAILABLE:
*/
