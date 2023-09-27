const express = require('express');
const db      = require('../db/db').connection;
const query   = require('../db/query');

const output = {
	main: function(req, res) {
		const resultObj = {
			status: "need login",
			msg: "not login",
		};

		const cookies = req.cookies;
		console.log(cookies);
		if (cookies.user)
		{
			resultObj.status = "success";
			resultObj.fastStartList = [];
			db.query(query.SELECT_ALL_FROM_FAST_START, (err, result) => {
				console.log(err);
				console.log(result);
				if (!!result) {
					for (let i = 0; i < result.length; i++) {
						const row = result[i];
						const songObj = {
							song: row.song,
							singer: row.singer,
							image_dir: row.image_dir
						};

						resultObj.fastStartList.push(songObj);
					}
				}
				else
				{
					resultObj.status = "query failed";
					console.log(err);
					resultObj.msg = err;
				}

				console.log(resultObj);
				res.send(resultObj);
			});
		}
		else {
			console.log(resultObj);
			res.send(resultObj);
		}
	}
};

const process = {
	login: function(req, res) {
		console.log(req.body);
		console.log(req.cookies);

		const reqID = req.body.id;
		const reqPW = req.body.pw;

		const result_data = {
			success: false,
			msg: ""
		};

		const query = 'SELECT id, password' + 
					  '  FROM user' +
					  " WHERE id = '" + reqID + "'";

		db.query(query, (err, queryResultWithRequestID) => {
			const isValidResult = function() {
				return !!queryResultWithRequestID;
			}

			const isExistResult = function() {
				return queryResultWithRequestID.length > 0
			};

			const isRightPW = function(pw) {
				return pw === queryResultWithRequestID[0].password
			};

			if (isValidResult()) {
				if (isExistResult()) {
					if (isRightPW(reqPW)) {
						result_data.success = true;
						result_data.msg = "success";
							
						res.cookie("user", reqID, {
							maxAge: 1000*60*1,
							httpOnly: true,
							domain: 'everdu.com',
						});

						console.log("로그인에 성공하였습니다. " + reqID);
					}
					else {
						result_data.msg = "비밀번호가 틀렸습니다.";
					}
				}
				else {
					result_data.msg = "아이디가 존재하지 않습니다";
				}
			}
			else {
				console.log(err);
				if (err.code == "ECONNREFUSED") {
					result_data.msg = "데이터베이스와 연결에 실패하였습니다.";
				} else if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
					result_data.msg = "쿼리 실행 중 치명적 오류가 발생하였습니다.";
				} else {
					result_data.msg = err.code;
				}
			}

			res.send(result_data);
		});
	},

	register: function(req, res) {
		console.log(req.body);

		const result_data = {
			success: false,
			msg: "no msg"
		};
		const query = "INSERT" 
					+ "  INTO user ("
					+ "	id, "
					+ "	password, "
					+ "	nick"
					+ ")"
					+ "VALUES ("
					+ "	'" + req.body.id + "',"
					+ "	'" + req.body.pw + "',"
					+ "	'" + req.body.nick + "'"
					+ ")";

		db.query(query, (err, result) => {
			if (!!result) {
				result_data.success = true;
				result_data.msg = "success";
				res.send(result_data);
			}
			else {
				result_data.msg = err.code;
				res.send(result_data);
				console.log(err);
			}
		});
	},

	auth: function(req, res) {
		resultObj = {};
		const cookies = req.cookies;
		try {
			resultObj.result = cookies.user;
		} catch (error) {
			resultObj.result = undefined;
			resultObj.msg = error;
		}

		res.send(resultObj); // nodemon test
	},
};

module.exports = {
	output,
	process,
};