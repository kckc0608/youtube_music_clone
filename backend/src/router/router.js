const express = require('express');
const db      = require('../db/db').connection;

const router = express.Router();

const makeSongObj = function(song, singer, imageDir) {
	const obj = {};
	obj.song = song;
	obj.singer = singer;
	obj.image_dir = imageDir;

	return obj;
}

router.get('/', function(req, res) {

	const resultObj = {
		status: "success",
		fastStartList: []
	};

	const cookies = req.cookies;
	console.log("cookies :");
	console.log(cookies);

	/*{
		resultObj.status = "need login";
		res.send(resultObj);
		return;
	}*/

	const fast_start_query = 'select * from fast_start';
	db.query(fast_start_query, (err, result) => {
		console.log(err);
		//console.log(result);
		if (!!result) {
			for (let i = 0; i < result.length; i++) {
				const row = result[i];
				resultObj.fastStartList.push(makeSongObj(row.song, row.singer, row.image_dir));
			}

			res.send(resultObj);
			console.log(resultObj);
		}
		else
		{
			res.send(err);
		}
	});
});

module.exports = router;