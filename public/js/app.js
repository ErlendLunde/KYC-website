const dataForm = document.querySelector("form")
const search = document.querySelector("input")
const firstMessage = document.querySelector("#firstMessage")
const hits = document.querySelector("#hits")
const liClass = "hit"

//Remove exsisting result
const removeLi =()=>{
    let liArray = document.getElementsByClassName(liClass)
    while(liArray[0]){
        liArray[0].parentNode.removeChild(liArray[0])
    }
}



//Render html list items with chosen atributes from API query
dataForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    removeLi()
    firstMessage.textContent = "Searching..."
    
    const name = search.value
    fetch("http://localhost:3000/asset?name=" + encodeURIComponent(name)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                firstMessage.textContent = data.error
            }else{
                firstMessage.textContent = "Search compleated, gave " + data.body.hits.length + " hits"
                hitsArray = data.body.hits
                hitsArray.forEach(element => {
                    //Create each Li element
                    const hit = document.createElement("li")
                    hit.className= liClass
                    hits.appendChild(hit)

                    //Create each atribute inside a li element
                    //Chose what attributes to show user
                    //And give them easier names to understand for a user
                    const {name, birth_date, dataset, countries} = element
                    const atributes = {"Name": name,"Countries(Country codes)":countries, "Birth Day": birth_date, "From dataset":dataset}

                    //Loop through each key/value pair and create a p element for each
                    for (const key in atributes){
                        const pElement = document.createElement("p")
                        const spanElement = document.createElement("span")
                        hit.appendChild(pElement)
                        pElement.appendChild(spanElement)

                        spanElement.textContent = key + ": "
                        pElement.append(atributes[key])
                      
                        
                        
                    }



                    

                });
                
            }
            
        })

    })


 
})