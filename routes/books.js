var express = require('express');
var router = express.Router();
var Book = require('../models').books;

/* GET books listing. */

router.get('/', function(req, res, next) {
	Book.findAll({
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(books => {
		res.render('all_books', { books: books });
	});
});

router.get('/new_book', function(req, res) {
	res.render('new_book');
});
/*
router.get('/:id', function(req, res, next) {
//	res.render('book_detail');
});
*/
/* GET detail book. */
router.get('/:id', function(req, res) {
	console.log(req.params.id);
	Book.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(book => {
		res.render('book_detail', { book: book });
	});
});

module.exports = router;
