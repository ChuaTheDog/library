var express = require('express');
var router = express.Router();
var Patron = require('../models').patrons;
var Loan = require('../models').loans;
var Book = require('../models').books;

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

router.get('/new_patron', function(req, res, next) {
	res.render('new_patron');
});

/* POST create Patron. */
router.post('/', function(req, res, next) {
	Patron.create(req.body)
		.then(function(patron) {
			res.redirect('/patrons/');
		})
		.catch(function(error) {
			if (error.name === 'SequelizeValidationError') {
				console.log(error.name);
				res.render('new_patron', {
					patron: Patron.build(req.body),
					errors: error.errors
				});
			} else {
				throw error;
			}
		});
});

/*get detail patron*/
router.get('/:id', function(req, res) {
	Patron.findById(req.params.id).then(patron => {
		Loan.findAll({
			where: {
				patron_id: req.params.id
			},
			include: [
				{
					model: Book
				},
				{
					model: Patron
				}
			]
		}).then(loans => {
			res.render('patron_detail', { patron, loans });
		});
	});
});

/*update detail patron*/

router.post('/:id', function(req, res, next) {
	//console.log(req.body);
	const updates = req.body.title;
	Patron.findById(req.params.id).then(patron => {
		patron
			.updateAttributes({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				address: req.body.address,
				email: req.body.email,
				library_id: req.body.library_id,
				zip_code: req.body.zip_code
			})
			.then(() => {
				res.redirect('/patrons/');
			})
			.catch(error => {
				if (error.name === 'SequelizeValidationError') {
					console.log(error.name);

					Loan.findAll({
						where: {
							book_id: req.params.id
						},
						include: [
							{
								model: Book
							},
							{
								model: Patron
							}
						]
					}).then(loans => {
						res.render('patron_detail', {
							patron: patron,
							loans,
							errors: error.errors
						});
					});
				}
			});
	});
});

module.exports = router;
