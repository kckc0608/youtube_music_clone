const mariadb = require('mysql');
const connection = mariadb.createConnection({
    host : 'localhost',
    user : 'ubuntu',
    password : 'Clsakqks!898',
    database : 'ym_music'
});

//connection.connect();
module.exports = connection;
