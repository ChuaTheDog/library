var express = require('express');
var router = express.Router();

/* GET patrons listing. */
router.get('/', function(req, res, next) {
	res.render('all_patrons');
});

module.exports = router;
