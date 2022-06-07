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
		fastStartList: [{
				song: "Re:Wind",
				singer: "이세계 아이돌",
				imageDir: "res/song/re_wind_album.jpeg"
			}, {
				song: "Re:Wind",
				singer: "이세계 아이돌",
				imageDir: "res/song/re_wind_album.jpeg"
			}
		]
	};

	const fast_start_query = 'select * from fast_start';

	db.query(fast_start_query, (err, result) => {
		console.log(err);
		console.log(result);
		if (err === null) {
			resultObj.fastStartList.push(makeSongObj(result[0].song, result[0].singer, result[0].image_dir));
		}
	});

	res.header("Access-Control-Allow-Origin", "*");
	res.send(resultObj);

	console.log(resultObj);

	//res.json
	//res.send('hello world!');
	//res.sendFile(__dirname + '/index.html');
});
