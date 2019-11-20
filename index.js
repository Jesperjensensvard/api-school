const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3000



app.get('/', function(req, res, next) {
    next()
})

app.use(express.static('public'))

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