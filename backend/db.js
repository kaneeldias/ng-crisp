var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '35.232.163.18',
  user: 'kaneeldias',
  password: 'bbcdogs@123',
  database: 'crisp'
});
const {log} = require('./log');

class DB {

  static runQuery(sql, callback) {
    log("running query " + sql);
    connection.query(sql, callback);
  }

}

module.exports = { DB };