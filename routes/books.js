var express = require('express');
var router = express.Router();
var Loan = require('../models').loans;
var Book = require('../models').books;
var Patron = require('../models').patrons;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var moment = require('moment');

/* GET books listing. */

router.get('/', function(req, res, next) {
	Book.findAll({
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(books => {
		res.render('all_books', { books: books });
	});
});

/*overdue books*/
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
			}
		]
	}).then(loans => {
		res.render('overdue_books', { loans: loans });
		//	res.send(loans);
	});
});

router.get('/checked/', function(req, res) {
	Loan.findAll({
		where: {
			returned_on: null
			/*		return_by: {
				[Op.gte]: moment().format('MM-DD-YYYY')
			}*/
		},
		include: [
			{
				model: Book
			}
		]
	}).then(loans => {
		res.render('checked_books', { loans: loans });
		//	res.send(loans);
	});
});
/* POST create Book. */
router.post('/', function(req, res, next) {
	Book.create(req.body)
		.then(function(book) {
			res.redirect('/books/');
		})
		.catch(function(error) {
			if (error.name === 'SequelizeValidationError') {
				console.log(error.name);
				res.render('new_book', {
					book: Book.build(req.body),
					errors: error.errors,
					title: 'New Article'
				});
			} else {
				throw error;
			}
		});
});

router.get('/new_book', function(req, res) {
	res.render('new_book');
});

/* GET detail book. */
router.get('/:id', function(req, res) {
	Book.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(book => {
		res.render('book_detail', { book: book });
	});
});

/*  update book. */
router.post('/:id', function(req, res, next) {
	//console.log(req.body);
	const updates = req.body.title;
	Book.findById(req.params.id).then(book => {
		book
			.updateAttributes({
				title: req.body.title,
				author: req.body.author,
				genre: req.body.genre,
				first_published: req.body.first_published
			})
			.catch(function(error) {
				if (error.name === 'SequelizeValidationError') {
					console.log(error.name);
					res.render('book_detail', {
						book: Book.build(req.body),
						errors: error.errors,
						title: 'New Article'
					});
				} else {
					throw error;
				}
			})
			.then(() => {
				res.redirect('/books/' + req.params.id);
			});
	});
});

module.exports = router;
