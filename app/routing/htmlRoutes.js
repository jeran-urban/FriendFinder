var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();

router.use(express.static(path.join(__dirname,'../public/'), {index: 'home.html'}));

router.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

module.exports = router;