var express = require('express');
var router = express.Router();
var Loan = require('../models').loans;
var Book = require('../models').books;
var Patron = require('../models').patrons;

var Sequelize = require('sequelize');
var moment = require('moment');

router.get('/', function(req, res, next) {
	Loan.findAll({ include: [{ model: Book }, { model: Patron }] }).then(
		loans => {
			res.render('all_loans', { loans: loans });
		}
	);
});

/* GET loans listing. */
router.get('/new_loan', function(req, res, next) {
	Loan.findAll({}).then(loans => {
		Patron.findAll({
			attributes: ['id', 'first_name', 'last_name']
		}).then(patrons => {
			res.render('new_loan', { patrons: patrons });
		});
	});
});

/* POST create Patron. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	res.send(req.body);
});

module.exports = router;
/*
GET ALL TITELS AVAILABLE:
*/
