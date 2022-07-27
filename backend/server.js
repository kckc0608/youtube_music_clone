// module
const express = require('express');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = require('./src/router/router');
const db = require('./src/db/db');

const app = express();
const port = 3000;

const sessionStore = new MySqlStore(db.info);

app.use('/api/project/ym_clone/', router);
//app.use(cors());
app.use(cookie_parser());
app.use(express.json());
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

app.post('/login', function(req, res) {
	console.log(req.body);

	const result_data = {};
	const query = 'select id, password' + 
				  '  from user' +
				  " where id = '" + req.body.id + "'";

	db.query(query, (err, result) => {
		if (!!result) {
			if (result.length === 0) {
				console.log("해당하는 아이디가 없습니다.");
				result_data.success = false;
				result_data.msg = "no_id";
			} else {
				if (req.body.pw === result[0].password) {
					// 로그인에 성공하면, 해당 유저 세션을 유지시키도록 세션 생성 후 메인 페이지로 리다이렉트
					console.log("login");
					
					/*
					req.session.uid       = result[0].id;
					req.session.author_id = result[0].id;
					req.session.isLogined = true;
					console.log(req.session);
					*/

					result_data.success = true;
					res.cookie("auth","true", {
						maxAge: 1000000,
						httpOnly: true,
					});
				}
				else {
					console.log("wrong password");

					result_data.success = false;
					result_data.msg = "wrong_pw";
				}
			}

			res.send(result_data);
		}
		else {
			console.log(err);
			//res.redirect('back');
		}
	});
});