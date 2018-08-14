var express = require('express');
var router = express.Router();

/* GET loans listing. */
router.get('/', function(req, res, next) {
	res.render('all_loans');
});

module.exports = router;
