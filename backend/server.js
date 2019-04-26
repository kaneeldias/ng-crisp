const express = require('express');
const app = express()
const cors = require('cors')
const { DB } = require('./db');
var mysql = require('mysql');
const bodyParser = require("body-parser");

const { log } = require('./log');
var MainRecord = require("./models/main_record");
var Operator = require("./models/operator");

app.use(bodyParser.json());

process.on('uncaughtException', function (err) {
    log(err)
});

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

app.listen(3000, () => {
    console.log('Server started!')
})

app.route('/').get((req, res) => {
    res.send({ 'msg': 'yay' });
})

app.route('/api/main-record').put((req, res) => {
    try {
        log("PUT request to /api/main-record");
        var res_body = {};
        var record = new MainRecord();
        record.week_start = req.body.week_start;
        record.helpdesk_reads = req.body.helpdesk_reads;
        record.new_conversations = req.body.new_conversations;
        record.people_created = req.body.people_created;
        record.conversations_assigned = req.body.conversations_assigned;
        record.mean_rating = req.body.mean_rating;
        record.save()
            .then(function () {
                res.status(200);
                res.send();
            })
            .catch(function (error) {
                log(error.code);
                res.status(500);
                res_body.error = true;
                res_body.message = error.code;
                res.send(res_body);
            });
    }
    catch (error) {
        log(error);
        res.status(500);
        res_body.error = true;
        res_body.message = error;
        res.send(res_body);
    }

})

app.route('/api/main-record').get((req, res) => {
    log("GET request to /api/main-record");
    MainRecord.getAll()
        .then(function (records) {
            res.status(200);
            res_body = records;
            res.send(res_body);
        })
        .catch(function (error) {
            log(error.code);
            res.status(500);
            res_body.error = true;
            res_body.message = error.code;
            res.send(res_body);
        });
});

app.route('/api/main-record/:week_start').get((req, res) => {
    var res_body = {};
    var week_start = req.params.week_start
    log("GET request to /api/main-record/" + week_start);
    var records = MainRecord.get(week_start)
        .then(function (record) {
            res.status(200);
            res_body = record;
            res.send(res_body);
        })
        .catch(function (error) {
            log(error);
            res.status(500);
            res_body.error = true;
            res_body.message = error;
            res.send(res_body);
        });

});

app.route('/api/main-record/last/:week_start/:x').get((req, res) => {
    var res_body = {};
    var week_start = req.params.week_start
    var x = req.params.x;
    log("GET request to /api/main-record/lastTwo" + week_start);
    var records = MainRecord.getLast(week_start, x)
        .then(function (records) {
            res.status(200);
            res_body = records;
            res.send(res_body);
        })
        .catch(function (error) {
            log(error);
            res.status(500);
            res_body.error = true;
            res_body.message = error;
            res.send(res_body);
        });

});

app.route('/api/operator').get((req, res) => {
    log("GET request to /api/operator");
    Operator.getAll()
        .then(function (operators) {
            res.status(200);
            res_body = operators;
            res.send(res_body);
        })
        .catch(function (error) {
            log(error.code);
            res.status(500);
            res_body.error = true;
            res_body.message = error.code;
            res.send(res_body);
        });
});

app.route('/api/main-record/:column/:week_start/:week_end').get((req, res) => {
    var column = req.params.column;
    var week_start = req.params.week_start;
    var week_end = req.params.week_end;
    log("GET request to /api/main-record/" + column + "/" + week_start + "/" + week_end);
    var res_body = {};
    var promise = MainRecord.getStat(column, week_start, week_end)
    promiseResponse(promise, res);
});

function promiseResponse(promise, res) {
    var res_body = {};
    promise
        .then(function (records) {
            res.status(200);
            res_body = records;
            res.send(res_body);
        })
        .catch(function (error) {
            log(error.code);
            res.status(500);
            res_body.error = true;
            if(error.code != undefined) res_body.message = error.code;
            else res_body.message = error;
            res.send(res_body);
        });
}