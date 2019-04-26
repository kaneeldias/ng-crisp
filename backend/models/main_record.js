const { DB } = require('../db');
var mysql = require('mysql');

module.exports = class MainRecord {


    save(){
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO main_records (week_start, helpdesk_reads, people_created, new_conversations, conversations_assigned, mean_rating) VALUES (?, ?, ?, ?, ?, ?)";
            var inserts = [
                self.week_start,
                self.helpdesk_reads,
                self.people_created,
                self.new_conversations,
                self.conversations_assigned,
                self.mean_rating
            ];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error) {
                if (error != undefined) {
                    reject(error);
                }
                resolve();
            });
        });
    }

}

