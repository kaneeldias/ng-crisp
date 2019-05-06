var mysql = require('mysql');

var mysql_pool  = mysql.createPool({
  connectionLimit : 100,
  host:'localhost',
  user: 'root',
  password: '',
  database: 'crisp'
});

/*var connection = mysql.createConnection({
  host: '35.232.163.18:3306',
  user: 'kaneeldias',
  password: 'bbcdogs@123',
  database: 'crisp'
});*/

const {log} = require('./log');

class DB {

  static runQuery(sql, callback) {
    log("running query " + sql);
    mysql_pool.getConnection(function(err, connection) {
        if (err) {
            if(connection != undefined) connection.release();
            //connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }
        connection.query(sql, function(err, field, results){
            connection.release();
            callback(err, field, results);
        });
    });

  }
}

module.exports = { DB };