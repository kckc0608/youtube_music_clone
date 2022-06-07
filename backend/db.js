const mariadb = require('mysql');
const connection = mariadb.createConnection({
    host : '193.122.123.213',
    user : 'ubuntu',
    password : 'Clsakqks!898',
    database : 'ym_music'
});

//connection.connect();
module.exports = connection;
