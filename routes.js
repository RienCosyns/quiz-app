var express = require("express");
var router = express.Router();
var request = require("request");
var fs = require("fs");
var url = "https://opentdb.com/api.php?amount=10";
var tokenHandling = require("./tokenvalidation");
var token = null;

router.get("/", (req, res) => {
    res.render("home", {title: "Categories"});
});

router.get("/quiz", (req, res) => {
    var category = req.query.categories;
    var diff = req.query.difficulty;
    var jsonObj = require("./categories.json");
    // console.log(jsonObj);
    var categoryId = jsonObj[category];

    console.log("token1: " + token);

    tokenHandling.validateToken(token).then((data) => {
        console.log("token2: " + data.token);
        if (categoryId){
            request({
            uri: url + "&category=" + categoryId + "&difficulty=" + diff + "&type=multiple" +
             "&token=" + data.token,
            method: "GET"
            }, (error, response, body) => {
                if (!error && response.statusCode == 200){
                    var output = JSON.parse(body);
                    if (output.response_code == 4){
                        console.log("Token expired")
                        tokenHandling.resetToken(data.token).then(res.redirect("/quiz"));
                    }else{
                        // console.log(body);
                        // console.log("Output: "+ JSON.stringify(output));
                        res.render("category", {title: category, questions: output.results, shuffle: shuffle})
                    }
                }else{
                    console.log(error);
                }
            })
        }else{
            request({
            uri: url + "&difficulty=" + diff + "&type=multiple",
            method: "GET"
            }, (error, response, body) => {
                if (!error && response.statusCode == 200){
                    if (response.response_code == 4){
                        tokenHandling.resetToken(data.token).then(res.redirect("/quiz"));
                    }else{
                        var output = JSON.parse(body);
                        res.render("category", {title: category, questions: output.results, shuffle: shuffle})
                    }
                }
            })
        }
    }).catch((error) => console.log(error));
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    }

module.exports = router;