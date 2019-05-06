var log = function(msg){
    var date = new Date();
    console.log(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "") + " " + msg);
}

module.exports = { log };