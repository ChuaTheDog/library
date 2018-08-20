var express = require('express');
var router = express.Router();
var Loan = require('../models').loans;
var Book = require('../models').books;
var Patron = require('../models').patrons;

var Sequelize = require('sequelize');
var moment = require('moment');
const Op = Sequelize.Op;

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
				[Op.lt]: moment().format('MM-DD-YYYY')
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

router.get('/:id', function(req, res, next) {
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

router.get('/new_loan', function(req, res, next) {
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
			res.render('new_loan', { books: books, patrons: patrons });
			//	res.send({ books, patrons });
		});
	});
});

/* POST create Patron. */
router.post('/', function(req, res, next) {
	Loan.create(req.body).then(loans => {
		res.redirect('/loans');
	});
});

module.exports = router;
