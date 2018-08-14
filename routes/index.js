var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/all_books', function(req, res, next) {
	res.render('all_books', {
		myVar: req.query.myVar
	});
});

router.get('/all_loans', function(req, res, next) {
	res.render('all_loans');
});

router.get('/all_patrons', function(req, res, next) {
	res.render('all_patrons');
});
module.exports = router;
