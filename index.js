const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3000



app.get('/', function(req, res, next) {
    next()
})

app.use(express.static('public'))


app.get('/movie/:movie', async function(req, res, next) {
    const baseMovieUrl = 'http://www.omdbapi.com/?';
    const movieApiKey = 'apikey=2602bde5&';
    let url = new URL(baseMovieUrl + movieApiKey +'s=' + req.params.movie)
    let movieFetch = await fetch(url)
    let json = await movieFetch.json();
    res.json(json)

app.get('/spaceinit', async function(req, res, next){
    const spaceBaseUral = 'https://api.nasa.gov/mars-photos/api/v1/'
    const spaceApiKey = 'zdZn3GS1CfaUIeEi7y9lG3mSxqsfVZ7SvljDkZin'
    const rover = 'curiosity'
    const camera = 'NAVCAM'
    let url = new URL(spaceBaseUral + "manifests/" + rover)
    url.search = new URLSearchParams({
        api_key: spaceApiKey
    })
    let initSpaceFetch = await fetch(url)
    let json = await initSpaceFetch.json();
    let data = await filterManifest(json,camera);
    res.json(data)
}) 

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

app.get('/spaceSearch/:id', async function(req, res, next){
    const spaceBaseUral = 'https://api.nasa.gov/mars-photos/api/v1/'
    const spaceApiKey = 'zdZn3GS1CfaUIeEi7y9lG3mSxqsfVZ7SvljDkZin'
    const rover = 'curiosity'
    const camera = 'NAVCAM'
    let url = new URL(spaceBaseUral + 'rovers/'  + rover + '/photos?')
    url.search = new URLSearchParams({
        camera: camera,
        sol: req.params.id,
        api_key: spaceApiKey
    })
    let SpaceFetch = await fetch(url)
    if(SpaceFetch.status != 200) {
        res.status(400).send('Bad Request')
    }else {
        let json = await SpaceFetch.json();
        res.json(json)
        res.status(200)
    }
}) 


app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.put('/', function (req, res) {
    res.send('Got a PUT request at /user')
})

app.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))