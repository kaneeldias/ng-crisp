var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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