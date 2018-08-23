var express = require('express');
var router = express.Router();
var Loan = require('../models').loans;
var Book = require('../models').books;
var Patron = require('../models').patrons;

var moment = require('moment');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};
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

router.get('/', function(req, res, next) {
	Loan.findAll({ include: [{ model: Book }, { model: Patron }] }).then(
		loans => {
			res.render('all_loans', { loans: loans });
		}
	);
});

router.get('/overdue/', function(req, res) {
	Loan.findAll({
		where: {
			returned_on: null,
			return_by: {
				[Op.lt]: moment().format('YYYY-MM-DD')
			}
		},
		include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(loans => {
		res.render('overdue_loans', { loans: loans });
		//	res.send(loans);
	});
});

router.get('/checked', function(req, res) {
	Loan.findAll({
		where: {
			returned_on: null
		},
		include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(loans => {
		res.render('checked_loans', { loans: loans });
		//	res.send(loans);
	});
});

router.get('/create', function(req, res, next) {
	Book.findAll({}).then(books => {
		Patron.findAll({}).then(patrons => {
			//res.json({ books, patrons });
			res.render('new_loan', { books, patrons });
		});
	});
});

/* POST create Loan. */
router.post('/create', function(req, res, next) {
	//res.send(req.body);
	Loan.create(req.body)
		.then(loans => {
			res.redirect('/loans');
		})
		.catch(error => {
			if (error.name === 'SequelizeValidationError') {
				Book.findAll({
					include: [
						{
							model: Loan
						}
					]
				}).then(books => {
					Patron.findAll({
						attributes: ['id', 'first_name', 'last_name']
					}).then(patrons => {
						res.render('new_loan', {
							books: books,
							patrons: patrons,
							errors: error.errors
						});
						//	res.send({ books, patrons });
					});
				});
			}
		});
});

router.get('/:id/return/', function(req, res, next) {
	Loan.findOne({
		where: {
			id: req.params.id
		},
		include: [
			{
				model: Book
			},
			{
				model: Patron
			}
		]
	}).then(loan => {
		res.render('return_book', { loan });
		//res.send(loan);
	});
});

router.post('/:id/return', function(req, res, next) {
	Loan.update(req.body, { where: { id: req.params.id } })
		.then(() => {
			res.redirect('/loans');
		})
		.catch(function(error) {
			if (error.name === 'SequelizeValidationError') {
				console.log(error.name);
				Loan.findOne({
					where: {
						id: req.params.id
					},
					include: [
						{
							model: Book
						},
						{
							model: Patron
						}
					]
				}).then(loan => {
					res.render('return_book', { loan });
					//res.send(loan);
				});
			} else {
				throw error;
			}
		});
});

module.exports = router;
