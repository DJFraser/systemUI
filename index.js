const fs = require('fs');
const path = require('path');
const ip = require('ip');

const express = require('express');

const port = 8080;
var app = express()

// Load systems Config
const config = require(path.join(__dirname, 'config.json'));

app.use('/assets', express.static(path.join(__dirname, 'views/assets')))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.route('/')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './views/index.html'));
    })

// Live Editor Link
app.route('/editor')
    .get((req,res) => {
        res.sendFile(path.join(__dirname, './views/editor.html'))
    })

// Api Endpoints

app.route('/api/getApp')
    .get((req,res) => {
        res.status(200).send(config.app)
    })

/**
 * getSystems
 * 
 * get  : returns array of systems
 * post : returns details of selected system
 */
app.route('/api/getSystems')
    .get((req,res) => {
        let out = [];
        
        config.systems.forEach((element) => {
            out.push(element.name)
        });

        res.status(200).send(out)
    })
    .post((req,res) => {
        let sys = req.body.system;

        var system = -1;

        config.systems.forEach((element) => {
            if(element.name == sys){
                system = element;
            }
        })
        
        if(system == -1){
            res.status(404).send(`System ${sys} Not Found`);
        } else {
            res.status(200).send(system)
        }
    })


app.listen(port, () => {
    console.log(`Listening on http://${ip.address()}:${port}`)
})