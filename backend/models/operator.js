const { DB } = require('../db');
var mysql = require('mysql');

const GST = ['Sanaa Saidi', 'Rim Allouche', 'khushali agarwal', 'Shyam Shah', 'Rahma Ouni '];

module.exports = class Operator {

    
    static getAll() {
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM operators";
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                var operators = [];
                results.forEach(function (row) {
                    var operator= new Operator()
                    operator.operator_id = row.operator_id;
                    operator.name = row.name;
                    //operator.sheet_name = row.sheet_name;
                    if(row.entity == "1") operator.type = "Entity";
                    else if(GST.indexOf(row.sheet_name) != -1) operator.type = "GST";
                    else operator.type = "Other";
                    if(operator.type == "Entity") operator.country = row.sheet_name;
                    operators.push(operator);
                })
                resolve(operators);
                return;

            });

        });
    }
}
