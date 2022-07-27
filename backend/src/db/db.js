const mariadb = require('mysql');
const db_info = {
	host : 'localhost',
	user : 'ubuntu',
	password : 'Clsakqks!898',
	database : 'ym_music'
};

//connection.connect();
module.exports = {
	info: db_info,
	connection: mariadb.createConnection(db_info)	
};