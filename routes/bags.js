const express = require('express');
var router = express.Router();
const flash = require('connect-flash');

var Bag = require('../models/bag');
var Product = require('../models/product');

router.get('/', function(req, res) { 
    if (req.user) {
        if (req.user.role == 0 || req.user.role == 1) {
            Bag.listBags(function(err, bags) {
                if (err) throw err;
                res.render('bags/index', { layout: 'layout_staff.handlebars', page_title: 'Bags list', 
                user: req.user, bags: bags });
            });
        }
        else {
            req.flash('error_msg', 'You don\'t have the authority to access this page!');
            res.redirect('/api/dashboard');
        }
    }
    else {
        req.flash('error_msg', 'You need to login first!');
        res.redirect('/');
    }
});

router.get('/new', function(req, res) {
    if (req.user) {
        if (req.user.role == 0 || req.user.role == 1) {
            Product.listProducts(function(err, products) {
                res.render('bags/addBag', { layout: 'layout_staff.handlebars', page_title: 'New bag', user: req.user,
                products: products });
            });
        }
        else {
            req.flash('error_msg', 'You don\'t have the authority to access this page!');
			res.redirect('/api/dashboard');
        }
    }
    else {
        req.flash('error_msg', 'You need to login first!');
        res.redirect('/');
    }
});

router.post('/new', function(req, res) { 
    if (req.user) {
        if (req.user.role == 0 || req.user.role == 1) {
            req.flash('error_msg', 'BACK-END FUNCTIONALITY IS STILL IN DEVELOPMENT. TRY AGAIN LATER! :)');
            res.redirect('back');
        }
        else {
            req.flash('error_msg', 'You don\'t have the authority to access this page!');
            res.redirect('/api/dashboard');
        }
    }
    else {
        req.flash('error_msg', 'You need to login first!');
        res.redirect('/');
    }
});

module.exports = router;