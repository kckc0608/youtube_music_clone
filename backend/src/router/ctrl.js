const express = require('express');
const db      = require('../db/db').connection;

const output = {
	main: function(req, res) {
		const resultObj = {
			status: "need login",
			msg: "not login",
		};

		const makeSongObj = function(song, singer, imageDir) {
			const obj = {};
			obj.song = song;
			obj.singer = singer;
			obj.image_dir = imageDir;

			return obj;
		}

		const cookies = req.cookies;
		console.log(cookies);
		if (cookies.auth)
		{
			resultObj.status = "success";
			resultObj.fastStartList = [];
			const query = 'select * from fast_start';
			db.query(query, (err, result) => {
				console.log(err);
				console.log(result);
				if (!!result) {
					for (let i = 0; i < result.length; i++) {
						const row = result[i];
						resultObj.fastStartList.push(makeSongObj(row.song, row.singer, row.image_dir));
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
			res.send(resultObj);
		}
	}
};

const process = {
	login: function(req, res) {
		console.log(req.body);

		const result_data = {
			success: false,
			msg: "no msg"
		};
		const query = 'select id, password' + 
					  '  from user' +
					  " where id = '" + req.body.id + "'";

		db.query(query, (err, result) => {
			if (!!result) {
				if (result.length === 0) {
					console.log("해당하는 아이디가 없습니다.");
					result_data.msg = "no_id";
				} else {
					if (req.body.pw === result[0].password) {
						console.log("login");
						result_data.success = true;
						result_data.msg = "success";
						
						// cookie test
						res.cookie(
							"auth", 
							"true", 
							{
								maxAge: 1000*60*1,
								httpOnly: true,
							}
						);
						
						console.log("cookie set");
					}
					else {
						console.log("wrong password");
						result_data.msg = "wrong_pw";
					}
				}

				res.send(result_data);
			}
			else {
				console.log(err);
			}
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
				console.log(err);
			}
		});
	}
};

module.exports = {
	output,
	process,
};