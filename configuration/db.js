let mysql = require('mysql');

let credentials = {
    host: 'localhost',
    user: 'root',
    database: 'bragsheet',
    password: '!ArchiveMaster123'
}

let con = mysql.createConnection({
    ...credentials, 
    multipleStatements: true
});

module.exports = con;