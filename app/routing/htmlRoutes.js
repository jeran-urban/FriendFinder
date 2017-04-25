var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var router = express.Router();

//Declare configurations for our Database
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friendFinder_db'
});

//Connect to our Database
connection.connect();
console.log("db connected");

router.use(express.static(path.join(__dirname,'../public/'), {index: 'home.html'}));

router.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

module.exports = router;