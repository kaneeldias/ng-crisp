const { DB } = require('./db');
var mysql = require('mysql');

class Cache {

    static get(req, fail) {
        return new Promise(function(resolve, reject){
            let method = req.method;
            let url = req.url.split("/api")[1];
            let body = JSON.stringify(req.body);
            var sql = "SELECT response FROM cache WHERE url = ? AND method = ? AND body = ? LIMIT 1";
            var inserts = [url, method, body];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error, results) {
                if (results.length == 0) {
                    fail()
                        .then(function (results) {
                            var sql = "INSERT INTO cache (url, method, body, response) VALUES (?, ?, ? ,?)";
                            var inserts = [url, method, body, JSON.stringify(results)];
                            sql = mysql.format(sql, inserts);
                            DB.runQuery(sql, function (error, results) { });
                            resolve(results);
                        })
                        .catch(function (error) {
                            reject(error);
                        })
                    return;
                }
                console.log("CACHE", req.url);
                resolve(JSON.parse(results[0].response));
            });
        })
        
    }
}

module.exports = { Cache };