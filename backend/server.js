const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.listen(port, function(){
	console.log('listening on 3000');
});

// GET == URL
app.get('/', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send({
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
	});
	//res.json
	//res.send('hello world!');
	//res.sendFile(__dirname + '/index.html');

	db.query('show databases', (err, result) => {
		console.log(err);
		console.log(result);
	});
});
