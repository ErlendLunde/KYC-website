console.log("client side javascript loaded")

const firstMessage = document.querySelector("#firstMessage")
const secondMessage = document.querySelector("#secondMessage")
const orgArticle = document.querySelector("#orgArticle")
const pepArticle = document.querySelector("#pepArticle")
const dataForm = document.querySelector("form")
const search = document.querySelector("input")
const classForRemoval = "dynamic"
let orgInfo = {}

//Remove exsisting result
const removeResult =()=>{
    let array = document.getElementsByClassName(classForRemoval)
    while(array[0]){
        array[0].parentNode.removeChild(array[0])
    }
}
dataForm.addEventListener("submit", (e)=>{
    removeResult()
    const orgNr = search.value
    firstMessage.textContent = "Searching for company..."
    secondMessage.textContent = "Getting ready for PEP check"
    e.preventDefault()
    console.log("search pressed")
    console.log(search.value)

    //Get and render data about the company
    fetch("/companySearch?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
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
                    warning.className = classForRemoval
                    orgArticle.appendChild(warning)

                    const flag = document.createElement("p")
                    flag.className = "Flag"
                    flag.textContent = "One or more hits found on following three atributes: \
                    Undegoing forced liquidation: " + orgInfo.undergoing_forced_liquidation +" \
                    Undergoing  liquidation: " + orgInfo.undergoing_liquidation + " \
                    Not registrerd in VAT register: " + !orgInfo.registered_in_VAT_register
                    flag.className = classForRemoval
                    orgArticle.appendChild(flag)

                }else{
                    const flag = document.createElement("p")
                    flag.textContent = "No information flagged by system as bad"
                    flag.className = classForRemoval
                    orgArticle.appendChild(flag)
                }
            
                //Render what data has been checked
                firstMessage.textContent ="Company found"
                const orgH4 = document.createElement("h4")
                orgH4.textContent = "Information checked by system:"
                orgH4.className = classForRemoval
                orgArticle.appendChild(orgH4)

                for (const key in orgInfo){
                    const pElement = document.createElement("p")
                    const spanElement = document.createElement("span")
                    pElement.className = classForRemoval
                    orgArticle.appendChild(pElement)
                    pElement.appendChild(spanElement)

                    spanElement.textContent = key + ": "
                    pElement.append(orgInfo[key])
                    
                }

            }
        })
    })
    fetch("/companyHigerUps?orgNr=" + encodeURIComponent(orgNr)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                secondMessage.textContent = data.error
            }else if(data.body.feilmelding){
                secondMessage.textContent = "could not do PEP check on company with given organization number"
            }
            //Get manegment names
            else{
                secondMessage.textContent = "PEP check on management may take up to a minute"
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
                    fetch("/pep?name=" + encodeURIComponent(element)).then((response)=>{
                        response.json().then((data)=>{
                            if(data.error){
                                let personStatus = document.createElement("p")
                                personStatus.textContent = data.error
                                pepArticle.appendChild(personStatus)
                            }
                            //Finds people who got a pep hit
                            else{       
                                console.log(element + " had "+ data.body.hits.length +" hits in PEP check")  
                                let personStatus = document.createElement("p")
                                personStatus.className = classForRemoval
                                //Mark the affected person with a special class
                                if(data.body.hits.length > 0){
                                    personStatus.classList.add("pepHit")
                                }
                                personStatus.textContent = element + " had "+ data.body.hits.length +" hits in PEP check"
                                pepArticle.appendChild(personStatus)
                               
                            }
                        })
                    })
                })
            }
        })
    })

})
