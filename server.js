var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

//serve up assets folder and all content as static files from server to client.
app.use(express.static(path.join(__dirname,'app')));

//use bodyParser, do not encode url.
app.use(bodyParser.urlencoded({
  extended: false
}));

//Import Routes.js and use this for all routing.
var routeOne = require('./app/routing/apiRoutes.js');
app.use('/', routeOne);

var routeTwo = require('./app/routing/htmlRoutes.js');
app.use('/', routeTwo);

//Ternary operator. If process.env.port is undefined, we use 9001. In either case, log result.
app.listen(PORT,function(){
  console.log("App listening on PORT " + PORT);
});