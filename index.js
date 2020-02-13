const fs = require('fs');
const path = require('path');
const ip = require('ip')

const express = require('express');

const port = 8080;
var app = express()

app.use('/assets' , express.static(path.join(__dirname, 'views/assets')));

app.route('/')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './views/index.html'));
    })

// Api Endpoints


app.listen(port, () => {
    console.log(`Listening on http://${ip.address()}:${port}`)
})