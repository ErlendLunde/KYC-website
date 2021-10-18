console.log("client side javascript loaded")

const firstMessage = document.querySelector("#firstMessage")
const secondMessage = document.querySelector("#secondMessage")
const orgArticle = document.querySelector("#orgArticle")
const dataForm = document.querySelector("form")
const search = document.querySelector("input")
const orgNr = search.value

let orgInfo = {}
//const orgNr = "981078365"

dataForm.addEventListener("submit", (e)=>{
    firstMessage.textContent = "Searching for company..."
    secondMessage.textContent = "Doing PEP check for management of company..."
    e.preventDefault()
    console.log("search pressed")
    console.log(search.value)

    //Get and render data about the company
    fetch("http://localhost:3000/companySearch?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                firstMessage.textContent = data.error
            }else if(data.body.feilmelding){
                firstMessage.textContent = "could not find company with given organization number"
            }
            else{
                //Get relevant data
                orgInfo = {
                    name: data.body.navn,
                    registered_in_Business_register: data.body.registrertIForetaksregisteret,
                    registered_as_a_charity: data.body.registrertIFrivillighetsregisteret,
                    registered_in_foundation_register: data.body.registrertIStiftelsesregisteret,
                    registered_in_VAT_register:data.body.registrertIMvaregisteret, 
                    undergoing_liquidation:data.body.underAvvikling, 
                    undergoing_forced_liquidation:data.body.underTvangsavviklingEllerTvangsopplosning
                }
                //Look for dangerous data
                if(orgInfo.undergoing_forced_liquidation || orgInfo.undergoing_liquidation || !orgInfo.registered_in_VAT_register ){
                    //Render dangerous data
                    const warning = document.createElement("p")
                    warning.textContent = "Warning system picked up the following:"
                    orgArticle.appendChild(warning)

                    const flag = document.createElement("p")
                    flag.className = "Flag"
                    flag.textContent = "One or more hits found on following three atributes: \
                    Undegoing forced liquidation: " + orgInfo.undergoing_forced_liquidation +" \
                    Undergoing  liquidation: " + orgInfo.undergoing_liquidation + " \
                    Not registrerd in VAT register: " + !orgInfo.registered_in_VAT_register
                    orgArticle.appendChild(flag)

                }else{
                    const flag = document.createElement("p")
                    flag.textContent = "No information flagged by system as bad"
                    orgArticle.appendChild(flag)
                }
            
                //Render what data has been checked
                firstMessage.textContent ="Company found"
                const orgH4 = document.createElement("h4")
                orgH4.textContent = "Information checked by system:"
                orgArticle.appendChild(orgH4)

                for (const key in orgInfo){
                    const pElement = document.createElement("p")
                    const spanElement = document.createElement("span")
                    orgArticle.appendChild(pElement)
                    pElement.appendChild(spanElement)

                    spanElement.textContent = key + ": "
                    pElement.append(orgInfo[key])
                
                    
                    
                }

                console.log(orgInfo)

            }
        })
    })
    fetch("http://localhost:3000/companyHigerUps?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                secondMessage.textContent = data.error
            }else if(data.body.feilmelding){
                secondMessage.textContent = "could not do PEP check on company with given organization number"
            }
            else{
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
                            //Possible to make it so that it only renders data if ther is a hit
                            else{
                                console.log(element + " had "+ data.body.hits.length +" hits in PEP check")
                            }
                        })
                    })
                })
            }
        })
})

})




//Get data about 'higher ups' and do a pep search on them and render data if a person show up on pepS 
// fetch("http://localhost:3000/companyHigerUps?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
//         response.json().then((data)=>{
//             if(data.error){
//                 console.log(error)
//             }else{
//                 let employees  = []
//                 console.log(data)
//                 data.body.forEach(element => {
//                     element.roller.forEach(roleElement =>{
//                         if(roleElement.person){
//                             employees.push(roleElement.person.navn.fornavn + " " + roleElement.person.navn.etternavn)
//                         }
//                     })    
//                 });

//                 ///Remove duplicates as a person can have multiple jobs
//                 employees = [...new Set(employees)]
//                 //Continues with unique array
//                 employees.forEach(element =>{
//                     fetch("http://localhost:3000/pep?name=" + encodeURIComponent(element)).then((response)=>{
//                         response.json().then((data)=>{
//                             if(data.error){
//                                 console.log(data.error)
//                             }
//                             //Possible to make it so that it only renders data if ther is a hit
//                             else{
//                                 console.log(element + " had "+ data.body.hits.length +" hits in PEP check")
//                             }
//                         })
//                     })
//                 })
//             }
//         })
// })