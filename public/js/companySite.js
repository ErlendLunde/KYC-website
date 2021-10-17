console.log("client side javascript loaded")
let orgInfo = {}
const orgNr = "981078365"

//Get and render data about the company 
fetch("http://localhost:3000/companySearch?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(error)
            }else{
                //Get relevant data
                orgInfo = {
                    Name: data.body.navn,
                    Registered_in_Business_register: data.body.registrertIForetaksregisteret,
                    Registered_as_a_charity: data.body.registrertIFrivillighetsregisteret,
                    Registered_in_foundation_register: data.body.registrertIStiftelsesregisteret,
                    Registered_in_VAT_register:data.body.registrertIMvaregisteret, 
                    Undergoing_liquidation:data.body.underAvvikling, 
                    Undergoing_forced_liquidation:data.body.underTvangsavviklingEllerTvangsopplosning
                }
                console.log(orgInfo)

            }
        })
})

//Get data about 'higher ups' and do a pep search on them and render data if a person show up on pepS 
fetch("http://localhost:3000/companyHigerUps?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(error)
            }else{
                let employees  = []
                console.log(data)
                data.body.forEach(element => {
                    element.roller.forEach(roleElement =>{
                        if(roleElement.person){
                            employees.push(roleElement.person.navn.fornavn + " " + roleElement.person.navn.etternavn)
                        }
                    })    
                });

                ///Remove duplicates as a person can have multiple jobs
                employees = [...new Set(employees)]
                //Continues with unique array
                employees.forEach(element =>{
                    fetch("http://localhost:3000/pep?name=" + encodeURIComponent(element)).then((response)=>{
                        response.json().then((data)=>{
                            if(data.error){
                                console.log(data.error)
                            }
                            else{
                                console.log(element + " had "+ data.body.hits.length +" hits in PEP check")
                            }
                        })
                    })
                })
            }
        })
})