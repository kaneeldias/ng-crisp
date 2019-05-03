const { DB } = require('../db');
var mysql = require('mysql');
var Conversation = require("./conversation");

const GST = ['Samia Siddiqui', 'Rim Allouche', 'khushali agarwal', 'Shyam Shah', 'Rahma Ouni '];

module.exports = class Operator {

    static getType(sheet_name, entity){
        if(entity == 1) return "Entity";
        if(GST.indexOf(sheet_name) != -1) return "GST";
        return "Other";
    }

    static getAssignedCountries(){
        return new Promise(function (resolve, reject) {
            var sql = "select operators.name, assigned_countries.country FROM assigned_countries INNER JOIN operators ON operators.operator_id = assigned_countries.operator_id";
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                var x = {};
                results.forEach(function(r){
                    var country = Conversation.mapCountryCode(r.country);
                    if(x[r.name] == undefined) x[r.name] = [];
                    x[r.name].push(country);
                })
                resolve(x);
            });

        })

    }

    static getAll() {
        var self = this;
        return new Promise(function (resolve, reject) {
            
            Operator.getAssignedCountries().then(function(assigned){
                var sql = "SELECT operator_id, entity, sheet_name, name FROM operators";
                DB.runQuery(sql, function (error, results) {
                    if (error != undefined) {
                        reject(error);
                        return;
                    }
                    var operators = [];
                    var mid = {};
                    results.forEach(function (row) {
                        if(mid[row.name] == undefined){
                            var operator= new Operator()
                            operator.operator_id = row.operator_id;
                            operator.name = row.name;
                            operator.assigned = [];
                            operator.type = Operator.getType(row.sheet_name, row.entity);
                            mid[row.name] = operator;
                        }
                        if(assigned[row.name] != undefined) mid[row.name].assigned = assigned[row.name];
                       
                        //operator.sheet_name = row.sheet_name;
                    });
                    for(var key in mid){
                        operators.push(mid[key]);
                    }
                    resolve(operators);
                    return;
    
                });
            })
            .catch(function(error){
                reject(error);
                return;
            });

        });
    }

    static getOfType(type){
        return new Promise(function(resolve, reject){
            Operator.getAll()
            .then(function(result){
                var arr = [];
                result.forEach(function(operator){
                    if(operator.type == type){
                        arr.push(operator);
                    };
                })
                resolve(arr);
            })
            .catch(function(error){
                reject(error);
            })
        })
    }

    static setAssigned(id, assigned){
        return new Promise(function(resolve, reject){
            var sql = "DELETE FROM assigned_countries WHERE operator_id = ?";
            var inserts = [id];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error, results) {
                if(error){
                    reject(error);
                    return;
                }

                var error_f = false;
                assigned.forEach(function(a){
                    var sql = "INSERT INTO assigned_countries (operator_id, country) VALUES (?, ?)";
                    var country = Conversation.mapCountryName(a);
                    var inserts = [id, country];
                    sql = mysql.format(sql, inserts);
                    DB.runQuery(sql, function (error, results) {
                        if(error) error_f = true;
                    });
                })

                if(error_f){
                    reject("Error");
                    return;
                }
                resolve();
                return;
            });

        })
    }
}
