const request = require("request")

//Get company status 
const getCompany = (orgNr, callback) =>{
    const url = "https://stacc-code-challenge-2021.azurewebsites.net/api/enheter?orgNr=" + encodeURIComponent(orgNr)
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback("unable to connect to API", undefined)
        }else{
            callback(undefined, response)
        }
    })
}

module.exports = getCompany