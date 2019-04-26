const { DB } = require('../db');
var mysql = require('mysql');

module.exports = class MainRecord {


    save() {
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO main_records" +
                "(week_start, helpdesk_reads, people_created, new_conversations, conversations_assigned, mean_rating)" +
                "VALUES (?, ?, ?, ?, ?, ?)" +
                "ON DUPLICATE KEY UPDATE helpdesk_reads = ?, people_created = ?, new_conversations = ?," +
                "conversations_assigned = ?, mean_rating = ?";
            var inserts = [
                self.week_start,
                self.helpdesk_reads,
                self.people_created,
                self.new_conversations,
                self.conversations_assigned,
                self.mean_rating, self.helpdesk_reads,
                self.people_created,
                self.new_conversations,
                self.conversations_assigned,
                self.mean_rating
            ];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                resolve();
                return;
            });
        });
    }

    static getAll() {
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM main_records";
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                var records = [];
                results.forEach(function (row) {
                    var record = new MainRecord();
                    if (row.week_start instanceof Date) {
                        row.week_start = new Date(row.week_start.setDate(row.week_start.getDate() + 1));
                        record.week_start = row.week_start.toISOString().split("T")[0];
                    }
                    else record.week_start = row.week_start;
                    record.new_conversations = row.new_conversations;
                    record.people_created = row.people_created;
                    record.helpdesk_reads = row.helpdesk_reads;
                    record.mean_rating = row.mean_rating;
                    record.conversations_assigned = row.conversations_assigned;
                    records.push(record);
                })
                resolve(records);
                return;

            });

        });
    }

    static get(week_start) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM main_records WHERE week_start = ?";
            var inserts = [
                week_start
            ];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                console.log(results.length);
                if (results.length == 0) {
                    reject("not found");
                    return;
                }
                results.forEach(function (row) {
                    var record = new MainRecord();
                    if (row.week_start instanceof Date) {
                        row.week_start = new Date(row.week_start.setDate(row.week_start.getDate() + 1));
                        record.week_start = row.week_start.toISOString().split("T")[0];
                    }
                    else record.week_start = row.week_start;
                    record.new_conversations = row.new_conversations;
                    record.people_created = row.people_created;
                    record.helpdesk_reads = row.helpdesk_reads;
                    record.mean_rating = row.mean_rating;
                    record.conversations_assigned = row.conversations_assigned;
                    resolve(record);
                    return;
                })
            });
        });
    }

    static getStat(column, week_start, week_end) {
        var self = this;
        var columns = ['helpdesk_reads', 'people_created', 'mean_rating'];
        return new Promise(function (resolve, reject) {
            if(columns.indexOf(column) == -1){
                reject("dude wtf");
                return;
            }
            var sql = "SELECT week_start, " + column +" FROM main_records WHERE week_start >= ? AND week_start <= ? ORDER BY week_start ASC";
            var inserts = [
                week_start, week_end
            ];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                if (results.length == 0) {
                    reject("not found");
                    return;
                }
                var records = [];
                results.forEach(function (row) {
                    var record = new MainRecord();
                    if (row.week_start instanceof Date) {
                        row.week_start = new Date(row.week_start.setDate(row.week_start.getDate() + 1));
                        row.week_start = row.week_start.toISOString().split("T")[0];
                    }
                    else row.week_start = row.week_start;
                    records.push(row);
                })
                resolve(records);
                return;
            });
        });
    }

    static getLast(week_start, x) {
        x = parseInt(x);
        var self = this;
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM main_records WHERE week_start <= ? ORDER BY week_start desc LIMIT " + x;
            var inserts = [
                week_start,
                x
            ];
            sql = mysql.format(sql, inserts);
            DB.runQuery(sql, function (error, results) {
                if (error != undefined) {
                    reject(error);
                    return;
                }
                if (results.length == 0) {
                    reject("not found");
                    return;
                }
                var records = [];
                results.forEach(function (row) {
                    var record = new MainRecord();
                    if (row.week_start instanceof Date) {
                        row.week_start = new Date(row.week_start.setDate(row.week_start.getDate() + 1));
                        record.week_start = row.week_start.toISOString().split("T")[0];
                    }
                    else record.week_start = row.week_start;
                    record.new_conversations = row.new_conversations;
                    record.people_created = row.people_created;
                    record.helpdesk_reads = row.helpdesk_reads;
                    record.mean_rating = row.mean_rating;
                    record.conversations_assigned = row.conversations_assigned;
                    records.push(record);
                })
                resolve(records);
                return;
            });
        });
    }

}

