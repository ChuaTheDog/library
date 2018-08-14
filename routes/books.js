var express = require('express');
var router = express.Router();
var Books = require('../models').books;

/* GET books listing. */

router.get('/', function(req, res) {
	res.render('all_books');
});
router.get('/new_book', function(req, res) {
	res.render('new_book');
});

router.get('/all_books', function(req, res) {
	Books.findAll({
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(books => {
		res.render('all_books', { books: books });
	});
});

module.exports = router;
