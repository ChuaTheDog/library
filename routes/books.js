var express = require('express');
var router = express.Router();
var Books = require('../models').books;

/* GET books listing. */

router.get('/', function(req, res, next) {
	Books.findAll({
		attributes: ['id', 'title', 'author', 'genre', 'first_published']
	}).then(books => {
		res.render('all_books', { books: books });
	});
});

router.get('/new_book', function(req, res) {
	res.render('new_book');
});

module.exports = router;
