const request = require("request")

//Get company higher ups status 
const getCompanyHU = (orgNr,callback)=>{
    const url ="https://stacc-code-challenge-2021.azurewebsites.net/api/roller?orgNr="+ encodeURIComponent(orgNr)
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback("unable to connect to API", undefined)
        }else{
            callback(undefined, response)
        }
    })

}

module.exports = getCompanyHU