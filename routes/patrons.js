var express = require('express');
var router = express.Router();
var Patron = require('../models').patrons;

/* GET patrons listing. */
router.get('/', function(req, res, next) {
	Patron.findAll({
		attributes: [
			'id',
			'first_name',
			'last_name',
			'address',
			'email',
			'library_id',
			'zip_code'
		]
	}).then(patrons => {
		res.render('all_patrons', { patrons: patrons });
	});
});

module.exports = router;
