// module
const express = require('express');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = require('./src/router/router');
const db = require('./src/db/db');

const app = express();
const port = 3000;

const sessionStore = new MySqlStore(db.info);

app.use('/api/project/ym_clone/', router);
//app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(session({
//	key: "loginData",
	secret: "abcd",
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}));

app.listen(port, function(){
	console.log('listening on 3000');
});