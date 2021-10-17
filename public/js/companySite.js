console.log("client side javascript loaded")
let orgInfo = {}
const orgNr = "981078365"

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