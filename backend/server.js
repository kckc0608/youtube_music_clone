const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

const makeSongObj = function(song, singer, imageDir) {
	const obj = {};
	obj.song = song;
	obj.singer = singer;
	obj.image_dir = imageDir;

	return obj;
}

app.listen(port, function(){
	console.log('listening on 3000');
});

// GET == URL
app.get('/', function(req, res) {
	const resultObj = {
		fastStartList: []
	};

	const fast_start_query = 'select * from fast_start';

	db.query(fast_start_query, (err, result) => {
		console.log(err);
		console.log(result);
		if (!!result) {
			for (let i = 0; i < result.length; i++) {
				const row = result[i];
				resultObj.fastStartList.push(makeSongObj(row.song, row.singer, row.image_dir));
			}

			res.header("Access-Control-Allow-Origin", "*");
			res.send(resultObj);

			console.log(resultObj);
		}
		else
		{
			res.send(err);
		}
	});
});
