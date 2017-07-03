var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var port = 3001;

var app = express();

// set view engine, use Pug
app.set("view engine", "pug");

// static serving public files
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: true}));

// get routes and import
var routes = require("./routes");
app.use(routes);

app.listen(port, () =>{
    console.log("Server listening on port " + port)
})