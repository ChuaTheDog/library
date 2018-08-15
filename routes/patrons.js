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

router.get('/:id', function(req, res) {
	Patron.findOne({
		where: { id: req.params.id },
		attributes: [
			'id',
			'first_name',
			'last_name',
			'address',
			'email',
			'library_id',
			'zip_code'
		]
	}).then(patron => {
		res.render('patron_detail', { patron: patron });
	});
});

module.exports = router;
