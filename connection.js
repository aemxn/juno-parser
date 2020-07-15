var mysql = require('mysql');
require('dotenv').config();

var db_name = '';
if (process.env.NODE_ENV === 'development') {
    db_name = process.env.DB_TEST_DATABASE;
} else {
    db_name = process.env.DB_DATABASE;
}

// mysql connector
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // https://stackoverflow.com/a/56509065/996701
    database: db_name,
    multipleStatements: true
  });
  
mysqlConnection.connect((err) => {
    if(!err) {
        console.log('---------------');
        console.log('Mysql connected');
        console.log('Database: ' + db_name);
        console.log('---------------');
    } else {
        console.log('Mysql connection error');
        console.log(err);
    }
});

module.exports = mysqlConnection;