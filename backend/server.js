const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3000;

app.listen(port, function(){
	console.log('listening on 3000');
});

// GET == URL
app.get('/', function(req, res) {
	res.send({
		fastStartList: [{
				song: "Re:Wind",
				singer: "이세계 아이돌",
				imageDir: "song/re-wind.png"
			}, {
				song: "Re:Wind",
				singer: "이세계 아이돌",
				imageDir: "song/re-wind.png"
			}
		]
	});
	//res.json
	//res.send('hello world!');
	//res.sendFile(__dirname + '/index.html');

	db.query('show databases', (err, result) => {
		console.log(result);
	});
});
