const baseUral = 'https://api.nasa.gov/mars-photos/api/v1/'
const nasaApiKey = 'zdZn3GS1CfaUIeEi7y9lG3mSxqsfVZ7SvljDkZin'
const rover = 'Curiousity'
console.log(true)

async function init_site() {
    console.log(true)
    try{
        let data = await make_init_url()
        append_list_of_opitons(data)
    }
    catch{
        console.error()
    }
}

async function make_Request(url) {
    let respons = await fetch(url)
    if(respons != 200) {
        console.log("errorroro")
        throw new Error(respons.status + ": " + respons.statusText)
    }else{
        console.log("success")
        return await respons.json()
    }
}


function make_init_url() {
    let url = new URL(baseUral + "manifest/" + rover)
    url.search = new URLSearchParams({
        api_key: nasaApiKey
    })
    return make_Request(url)
} 
    
function append_list_of_opitons(data) {

}
