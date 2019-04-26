const express = require('express');
const app = express()
const cors = require('cors')
const {DB} = require('./db');
var mysql = require('mysql');
const bodyParser = require("body-parser");

const {log} = require('./log');
var MainRecord =  require("./models/main_record");

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
    res.send({'msg':'yay'});
})

app.route('/api/main-record').put((req, res) => { 
    var promise;
    try{
        log("request to /api/main-record");
        var res_body = {};
        var record = new MainRecord();
        record.week_start = req.body.week_start;
        record.helpdesk_reads = req.body.helpdesk_reads;
        record.new_conversations = req.body.new_conversations;
        record.people_created = req.body.people_created;
        record.conversations_assigned = req.body.conversations_assigned;
        record.mean_rating = req.body.mean_rating;
        promise = record.save()
        .then(function(){
            res.status(200);
            res.send();
        })
        .catch(function(error){
            log(error.code);
            res.status(500);
            res_body.error = true;
            res_body.message = error.code;
            res.send(res_body);
        });
    }
    catch(error){
        log(error);
        res.status(500);
        res_body.error = true;
        res_body.message = error;
        res.send(res_body);
    }

})
