var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var router = express.Router();

//Variables global to file
var newFriend = [];
var user =0;
var newBestFriend = [];

//Declare configurations for our Database
if (process.env.JAWSDB_URL) {
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
    }
else {
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'friendFinder_db'
    });
}

//Connect to our Database
connection.connect();

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
            for (var ix = 0; ix < result.length; ix++) {
                newFriend.push(result[ix].total);
            }
        console.log(newFriend);
        
        postFriend(req, res);
        closest(user, newFriend);        
    });
    
    function postFriend(req, res) {
        var name = req.body.name;
        var photo = req.body.photo;
        var scores = req.body.scores;
        console.log(scores);
        for (var i = 0; i < scores.length; i++) {
            if (parseInt(scores[i])) {
                user += parseInt(scores[i]);
                // console.log("user score " + scores[i]);
            }
            
        }
        console.log("user= " + user);
    } 
    //compare user score to friends' scores
    function closest (num, arr) {
        var curr = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        // find the corresponding name and photo of matched friend
        console.log("please " + curr);
        connection.query('SELECT * FROM friends WHERE total=?', [curr], function(err, res) {
            if(err) throw err;
            newBestFriend.push(res[0].name, res[0].photo);
            console.log("new " + newBestFriend);
            send();
        });
    }  
    // send the result back to the html
    function send() {
        console.log("new friend" + newBestFriend);
        res.json(newBestFriend);
        newFriend = [];
        user =0;
        newBestFriend = [];
    }
});

module.exports = router;

