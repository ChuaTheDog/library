var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res, next) {
	res.render('all_books');
});
router.get('/all_books', function(req, res, next) {
	res.render('all_books');
});
module.exports = router;
