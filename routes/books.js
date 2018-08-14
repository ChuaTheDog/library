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
			.then(() => {
				res.redirect('/books/' + req.params.id);
			});
	});
});

module.exports = router;

/*

Article.findById(req.params.id)
	.then(function(article) {
		return article.update(req.body);
	})
	.then(function(article) {
		res.redirect('/articles/' + article.id);
	});

	*/
