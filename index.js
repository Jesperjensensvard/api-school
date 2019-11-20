const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3000



app.get('/', function(req, res, next) {
    next()
})

app.use(express.static('public'))


app.get('/movie/:movie', async function(req, res, next) {
    const movieApiKey = 'http://www.omdbapi.com/?';
    const baseMovieUrl = 'apikey=2602bde5&';
    let url = new URL(movieApiKey + baseMovieUrl +'s=' + req.params.movie)
    console.log(url)
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