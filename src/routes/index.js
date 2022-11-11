const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/', isNotLoggedIn, (req, res) => {
    res.render('layouts/index');
});

router.get('/scuter', isLoggedIn, (req, res) => {
    res.render('build/index')
});

router.get('/pruebas', (req, res) => {
    res.render('test/index')
});


module.exports = router;