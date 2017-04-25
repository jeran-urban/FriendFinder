var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var router = express.Router();
var newFriend = [];
var user =0;
var newBestFriend = [];
//Declare configurations for our Database
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friendFinder_db'
});

//Connect to our Database
connection.connect();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({
//     type: "application/vnd.api+json"
// }));

router.get("/api/friends", function(req, res) {
    connection.query("SELECT * FROM friends", function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/friends', function(req, res) {
    connection.query('SELECT * FROM friends', function(error, result) {
        console.log("got to db");
        if (error) throw error;
        console.log(result[0].total);
            for (var ix = 0; ix < result.length; ix++) {
                newFriend.push(result[ix].total);
            }
        console.log("2 " +newFriend);
        
        postFriend(req, res);
        closest(user, newFriend);
        console.log("after new best friend " + newBestFriend);
    console.log("after new friend " + newFriend);
    console.log("after user " + user);
        
    });
    

function postFriend(req, res) {
    console.log("got to postFriend");
    var name = req.body.name;
    var photo = req.body.photo;
    var scores = req.body.scores;
    console.log(scores);
    for (var i = 0; i < scores.length; i++) {
        // console.log(parseInt(scores[i]));
        if (parseInt(scores[i])) {
            user += parseInt(scores[i]);
            // console.log("this" + scores[i]);
        }
        
    }
    console.log("user= " + user);

    

    console.log("func new best friend " + newBestFriend);
    console.log("func new friend " + newFriend);
    console.log("func user " + user);
} 
function closest (num, arr) {
    console.log("got to closest");
        var curr = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        console.log("please " + curr);

        connection.query('SELECT * FROM friends WHERE total=?', [curr], function(err, res) {
            console.log("got to 2nd db call");
            if(err) throw err;
                newBestFriend.push(res[0].name, res[0].photo);
                // newBestFriend.push(res[0].photo);

            console.log("new " + newBestFriend);
            send();
        });
    }
    console.log("end new best friend " + newBestFriend);
    console.log("end new friend " + newFriend);
    console.log("end user " + user);
console.log(req.body);

    
    

function send() {
    console.log("got to send" + newBestFriend);
    res.json(newBestFriend);
    newFriend = [];
    user =0;
    newBestFriend = [];
}
});

module.exports = router;

