var photoArray = []

async function initSite() {
    url = '/spaceinit'
    let res = await fetch(url)
    if(res.status != 200){
        throw new Error(response.status + ': ' + response.statusText)
    }else{
        let data =  await res.json();
        fillList(data)
    }
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
        url = '/spaceSearch/' + ruleOne
        let res = await fetch(url)
        if(res.status != 200){
            throw new Error(response.status + ': ' + response.statusText)
        }else{
            let data =  await res.json();
            printMarshPhotos(data)
        }
    }
}

function printMarshPhotos(photosList) {

    var imageholder = document.getElementById('image-holder');
    imageholder.innerHTML = '';
    
    photosList.photos.forEach(images => {
        var image = document.createElement('div')

        image.classList.add('space-img')

        image.style.backgroundImage = "url(" + images.img_src +")";

        imageholder.append(image)
    });
}