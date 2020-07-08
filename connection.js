var mysql = require('mysql');
require('dotenv').config();

// mysql connector
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // https://stackoverflow.com/a/56509065/996701
    database: process.env.DB_NAME,
    multipleStatements: true
  });
  
mysqlConnection.connect((err) => {
    if(!err) {
        console.log('Mysql connected');
    } else {
        console.log('Mysql connection error');
        console.log(err);
    }
});

module.exports = mysqlConnection;