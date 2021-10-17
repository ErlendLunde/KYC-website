const request = require("request")

const getPep = (name, callback) =>{
    const url = "https://stacc-code-challenge-2021.azurewebsites.net/api/pep?name=" + encodeURIComponent(name)
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback("unable to connect to API", undefined)
        }else{
            callback(undefined, response)
        }
    })
}

module.exports = getPep