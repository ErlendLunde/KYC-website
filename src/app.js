const path = require("path")
const express = require("express")
const hbs = require("hbs")
const getPep = require("./utils/pep.js")
const getCompany = require("./utils/companyKYC.js")
const getCompanyHU = require("./utils/companyHU.js")



const app = express()
const port = process.env.PORT || 3000

//Define paths for exspress
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir
app.use(express.static(publicDirPath))


//ROUTES

app.get("", (req,res) =>{
    res.render("index",{
        title:"Homepage"
    })
})
app.get("/person", (req, res)=>{
    res.render("person",{
        title: "PEP Search"
    })
})
app.get("/company",(req, res)=>{
    res.render("company",{
        title: "Company Search"
    })
})

//For pep check
app.get("/pep",(req, res)=>{
    if(!req.query.name){
        return res.send({
            error:"You must provide a name"
        })
    }
    getPep(req.query.name, (error, data)=>{
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
    })

})

//For company check
app.get("/companySearch", (req, res)=>{
    if(!req.query.orgNr){
        return res.send({
            error: "You must provide organisation number"
        })
    }
    getCompany(req.query.orgNr, (error, data)=>{
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
    })
})

//For company 'higher ups' check
app.get("/companyHigerUps", (req, res)=>{
    if(!req.query.orgNr){
        return res.send({
            error: "You must provide organisation number"
        })
    }
    getCompanyHU(req.query.orgNr, (error, data)=>{
        if(error){
            res.send(error)
        }else{
            res.send(data)
        }
    })
})





app.get("*",(req, res)=>{
    res.render("404")
})

//STARTUP
app.listen(port, () => {
    console.log("server is up on port " + port)
})