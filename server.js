var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

//serve up assets folder and all content as static files from server to client.
app.use(express.static(path.join(__dirname,'app')));

//use bodyParser, do not encode url.
app.use(bodyParser.urlencoded({
  extended: false
}));

//Routing paths for APIs and html docs.
var routeOne = require('./app/routing/apiRoutes.js');
app.use('/', routeOne);

var routeTwo = require('./app/routing/htmlRoutes.js');
app.use('/', routeTwo);

//Ternary operator. If process.env.port is undefined, we use 3000. In either case, log result.
app.listen(process.env.PORT || 3000,function(){
  process.env.PORT == undefined? console.log("App listening on Port 3000"):console.log("App listening on PORT" + process.env.PORT);
});