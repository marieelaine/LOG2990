var MongoClient = require('mongodb').MongoClient;

// � MODIFIER PAR VOUS
var DB_USER = "olivierND";
var DB_PASSWORD = "ol1v13rn";
var DB_DB = "projet2";
var DB_HOST = "ds157742.mlab.com";
var DB_PORT = "57742";

var DB_URL = "mongodb://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_DB;

MongoClient.connect(DB_URL,{useNewUrlParser : true}, function(err,client){
    if(!err){
        console.log("Nous sommes connect�s � " + client.s.options.dbName);
    }
    else{
        console.log(err);
    }
});