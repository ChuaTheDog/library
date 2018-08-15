var express = require('express');
var router = express.Router();
var Patron = require('../models').patrons;

/* GET patrons listing. */
router.get('/', function(req, res, next) {
	res.render('all_patrons');
});

module.exports = router;
