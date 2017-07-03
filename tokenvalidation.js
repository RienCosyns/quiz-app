var request = require("request");
// use promises
module.exports = {
    validateToken: function(token){
        if (!token){
            return new Promise(function(resolve, reject){
                request("https://opentdb.com/api_token.php?command=request", (error, response, body) => {
                    if (!error && response.statusCode == 200){
                        var output = JSON.parse(body);
                        console.log(output);
                        console.log("Token request: " + output.token);
                        resolve(output);
                    }else{
                        reject({error: error})
                    }
                })
            })  
        }else{
            return;
        }
    },
    resetToken: function(token){
        return new Promise( (resolve, reject) => {
            request("https://opentdb.com/api_token.php?command=reset&token=" + token, (error, response, body) => {
                if (!error && response.statusCode == 200){
                    var output = JSON.parse(body);
                    resolve(output);
                }else{
                    reject(error);
                }
            })
        })
    }
}