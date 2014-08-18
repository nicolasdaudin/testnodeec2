var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

var dbPath = "mongodb://localhost:27017/smd";

console.log(dbPath);

var greetingSchema = mongoose.Schema({
        sentence: String
});
var Greeting = mongoose.model('Greeting',greetingSchema);

db = mongoose.connect(dbPath);

mongoose.connection.once('open',function(){
        var greeting;
        Greeting.find(function(err,greetings){
                if(!greetings || greetings.length == 0){
                        console.log("Creating a new Greeting");
                        greeting = new Greeting ({sentence : "Hello World SMD"});
                        greeting.save();
                } else {
                        console.log("Greeting already exists - creating a new one");
                        greeting = new Greeting ({sentence : "Hello World GITTTT" + new Date().getTime() / 1000;});
                        greeting.save();
                }
        });
});



app.get('/',function(req,res){
        Greeting.find(function(err,greetings){
                if(!greetings){
                        console.log("No Greeting found");
                } else {

                        console.log("Greetings found : " + greetings);
                        res.send(greetings[0].sentence);
                }
        });
});

app.use(function(err, req, res, next){
        if (req.xhr) {
                res.send(500, 'Something went wrong!');
        } else {
                next(err);
        }
});

console.log('starting the Express (NodeJS) Web Server SMD and this is my first GIT commit');
app.listen(8080);
console.log('Webserver is listening on port 8080');

