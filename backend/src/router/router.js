const express = require('express');
const db      = require('../db/db').connection;
const ctrl    = require('./ctrl');
const cookie_parser = require('cookie-parser');
const cors = require('cors');

const router = express.Router();

router.use(cookie_parser());
router.use(express.json());
//router.use(cors());

router.get('/', ctrl.output.main);

router.post('/login', ctrl.process.login);

module.exports = router;