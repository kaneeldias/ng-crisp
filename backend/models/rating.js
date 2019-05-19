const { DB } = require('../db');
var mysql = require('mysql');
var Common = require("../common");
var Operator = require("./operator");

module.exports = class Rating {

    static getByWeek(start, end, options){

        return new Promise(function(resolve, reject){
            var sql = "SELECT COUNT(rating) as count, AVG(rating) as average, DATE_FORMAT(STR_TO_DATE(CONCAT(YEAR(timestamp), WEEK(timestamp,1)-1, 'Monday'), '%X %V %W'), '%Y-%m-%d') as week FROM ratings WHERE DATE(timestamp) BETWEEN ? AND ? GROUP BY week";
            var inserts = [start, end];
            
            if(options != undefined && options.filter != undefined){
                var sql = "SELECT COUNT(rating) as count, AVG(rating) as average, DATE_FORMAT(STR_TO_DATE(CONCAT(YEAR(timestamp), WEEK(timestamp,1)-1, 'Monday'), '%X %V %W'), '%Y-%m-%d') as week FROM ratings WHERE DATE(timestamp) BETWEEN ? AND ? AND conversation_id IN (SELECT DISTINCT(conversation_id) FROM messages WHERE user_id IN (SELECT operator_id FROM operators WHERE name IN (?) ) ) GROUP BY week";
                var inserts = [start, end, options.filter];
                
            }

            sql = mysql.format(sql, inserts);
    


            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
    
                resolve(results);
    
            });
        })


    }

    static getByOperator(start, end, options){

        return new Promise(function(resolve, reject){
            var sql = "SELECT COUNT(rating) as count, AVG(rating) as average FROM ratings INNER JOIN WHERE DATE(timestamp) BETWEEN ? AND ? GROUP BY operator.name";
            var inserts = [start, end];
            
            if(options != undefined && options.filter != undefined){
                var sql = "SELECT COUNT(rating) as count, AVG(rating) as average, DATE_FORMAT(STR_TO_DATE(CONCAT(YEAR(timestamp), WEEK(timestamp,1)-1, 'Monday'), '%X %V %W'), '%Y-%m-%d') as week FROM ratings WHERE DATE(timestamp) BETWEEN ? AND ? AND conversation_id IN (SELECT DISTINCT(conversation_id) FROM messages WHERE user_id IN (SELECT operator_id FROM operators WHERE name IN (?) ) ) GROUP BY week";
                var inserts = [start, end, options.filter];
                
            }

            sql = mysql.format(sql, inserts);
    


            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
    
                resolve(results);
    
            });
        })
    }
    
}