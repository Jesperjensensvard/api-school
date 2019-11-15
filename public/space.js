const baseUral = 'https://api.nasa.gov/mars-photos/api/v1/'
const apiKey = 'zdZn3GS1CfaUIeEi7y9lG3mSxqsfVZ7SvljDkZin'
const rover = 'curiosity'
const camera = 'NAVCAM'

var photoArray = []

async function initSite() {
    try{
        let manifest = await getManifest()
        let photoArray = filterManifest(manifest, camera)
        fillList(photoArray)
    } catch(err){
        console.error(err)
    }
}

function getManifest() {
     let url = new URL(baseUral + "manifests/" + rover)
     url.search = new URLSearchParams({
         api_key: apiKey
     })

     return makeRequest(url)
}

async function makeRequest(url) {
    let response = await fetch(url)
    if(response.status != 200){
        console.log("error")
        throw new Error(response.status + ': ' + response.statusText)
    } else{
        console.log("success")
        return await response.json()
    }
}

function filterManifest(manifest, cameraTofilterby) {
    let photoArray =  manifest.photo_manifest.photos
   
    return photoArray.filter((item) => {
        let navcamExist = false
        item.cameras.forEach(camerainput => {
            if(camerainput == cameraTofilterby){
                navcamExist = true
            }
        });
        return navcamExist
    });
}

function fillList(itemsToAdd) {
    var solList = document.getElementById('solpick')
    itemsToAdd.forEach(item =>{
        var sol = document.createElement('option')
        sol.innerText = item.sol
        solList.append(sol)
    })
}


async function searchPhotos() {
    var ruleOne = document.getElementById('solpick').value
    if(ruleOne != null && ruleOne != "") {
        try{
            let photosList =  await getPhotoList(ruleOne)
                printMarshPhotos(photosList)
            
        }catch (err){
            console.error(err)
        }
    }
}

function getPhotoList(ruleOne) {
    let url = new URL(baseUral + 'rovers/'  + rover + '/photos?')
    url.search = new URLSearchParams({
        camera: camera,
        sol: ruleOne,
        api_key: apiKey

    })
    return makeRequest(url)
}

function printMarshPhotos(photosList) {
    var imageholder = document.getElementById('image-holder');
    imageholder.innerHTML = '';
    
    photosList.photos.forEach(images => {
        var image = document.createElement('div')

        image.classList.add('space-img')

        image.style.backgroundImage = "url(" + images.img_src +")";

        /*   
        movieCard.style.backgroundImage = "url("+ movie.Poster +")";
        title.innerHTML = movie.Title    
        year.innerHTML = movie.Year
        type.innerHTML = movie.Type
        textholder.classList.add('movie-text-holder')
         */
        

        imageholder.append(image)
    });
}