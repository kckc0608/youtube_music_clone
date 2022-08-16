const express = require('express');
const db      = require('../db/db').connection;
const ctrl    = require('./ctrl');
const cookie_parser = require('cookie-parser');

const router = express.Router();

router.use(cookie_parser());
router.use(express.json());

router.get('/', ctrl.output.main);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/auth', ctrl.process.auth);

module.exports = router;