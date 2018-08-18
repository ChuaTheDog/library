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

module.exports = router;
/*
GET ALL TITELS AVAILABLE:
*/
