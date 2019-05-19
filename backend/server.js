const express = require('express');
const app = express()
const cors = require('cors')
const { DB } = require('./db');
var mysql = require('mysql');
const { Cache } = require('./cache');

const bodyParser = require("body-parser");

const { log } = require('./log');
var MainRecord = require("./models/main_record");
var Operator = require("./models/operator");
var Conversation = require("./models/conversation");
var Rating = require("./models/rating");


app.use(bodyParser.json());

var queue = require('express-queue');
app.use(queue({ activeLimit: 100, queuedLimit: -1 }));

var res_body = {};

process.on('uncaughtException', function (err) {
    console.log(err)
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(3000, () => {
    console.log('Server started!')
})

app.route('/').get((req, res) => {
    res.send({ 'msg': 'yay' });
})

app.route('/api/main-record').post((req, res) => {
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
    var res_body = {};
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
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        log("GET request to /api/main-record/" + column + "/" + week_start + "/" + week_end);
        var res_body = {};
        return MainRecord.getStat(column, week_start, week_end)
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/assigned-breakdown/:week_start/:week_end').get((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        log("GET request to /api/conversation/assigned-breakdown/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getAssignedBreakdown(week_start, week_end)
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/created-by-country/:week_start/:week_end').get((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        log("GET request to /api/conversation/created-by-country/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getCreatedByCountry(week_start, week_end)
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/active-by-week/:week_start/:week_end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        var options = req.body.options
        log("GET request to /api/conversation/active-by-week/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getActiveByWeek(week_start, week_end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/answered-by-week/:week_start/:week_end').get().post((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        var options = req.body.options;
        log("GET request to /api/conversation/answered-by-week/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getAnsweredByWeek(week_start, week_end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/active-by-country/:week_start/:week_end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        var options = req.body.options;
        log("GET request to /api/conversation/active-by-country/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getActiveByCountry(week_start, week_end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/answered-by-country/:week_start/:week_end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        var options = req.body.options;
        log("GET request to /api/conversation/answered-by-country/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getAnsweredByCountry(week_start, week_end, options)
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/answered-by-operator-type/:week_start/:week_end').get((req, res) => {
    let promise = Cache.get(req, function () {
        var column = req.params.column;
        var week_start = req.params.week_start;
        var week_end = req.params.week_end;
        log("GET request to /api/conversation/answered-by-operator-type/" + week_start + "/" + week_end);
        var res_body = {};
        return Conversation.getAnsweredByOperatorType(week_start, week_end);
    });
    promiseResponse(promise, res);
});

app.route('/api/operator/get-of-type/:type').get((req, res) => {
    let promise = Cache.get(req, function () {
        var type = req.params.type;
        log("GET request to /api/operator/get-of-type/" + type);
        var res_body = {};
        return Operator.getOfType(type);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/answered-by-operator/:start/:end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var start = req.params.start;
        var end = req.params.end;
        var options = req.body.options;
        log("GET request to /api/conversation/answered-by-operator/");
        var res_body = {};
        return Conversation.getAnsweredByOperator(start, end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/active-by-operator/:start/:end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var start = req.params.start;
        var end = req.params.end;
        var options = req.body.options;
        log("GET request to /api/conversation/active-by-operator/");
        var res_body = {};
        return Conversation.getActiveByOperator(start, end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/operator/set-assigned').post((req, res) => {
    let promise = Cache.get(req, function () {
        var id = req.body.id;
        var assigned = req.body.assigned;
        log("GET request to /api/operator/set-assigned");
        var res_body = {};
        return Operator.setAssigned(id, assigned);
    });
    promiseResponse(promise, res);
});

app.route('/api/operator/assigned/:name').get((req, res) => {
    let promise = Cache.get(req, function () {
        var name = req.params.name;
        log("GET request to /api/operator/assigned/" + name);
        var res_body = {};
        return Operator.getAssigned(name);
    });
    promiseResponse(promise, res);
});

app.route('/api/conversation/answered-breakdown-by-operator/:start/:end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var start = req.params.start;
        var end = req.params.end;
        var options = req.body.options;
        //var options = req.body.options;
        //var options = {filter:['Rim Allouche']}
        log("GET request to /api/conversation/answered-breakdown-by-operator/");
        var res_body = {};
        return Conversation.getAnsweredBreakdownByOperator(start, end, options);
    });
    promiseResponse(promise, res);
});

app.route('/api/rating/by-week/:start/:end').post((req, res) => {
    let promise = Cache.get(req, function () {
        var start = req.params.start;
    var end = req.params.end;
    var options = req.body.options;
    //var options = req.body.options;
    //options = {filter:['khushali agarwal']}
    log("GET request to /api/rating/by-week/");
    var res_body = {};
    return Rating.getByWeek(start, end, options);
    });
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
            console.log(error);
            log(error.code);
            res.status(500);
            res_body.error = true;
            if (error.code != undefined) res_body.message = error.code;
            else res_body.message = error;
            res.send(res_body);
        })
        .finally(function () {
            log("COMPLETE request");
        });
}

