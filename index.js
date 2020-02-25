const fs = require('fs');
const path = require('path');
const ip = require('ip');
const formidable = require('formidable')

const express = require('express');

const port = 8080;
var app = express()

// Load systems Config
var config = loadConfig();

function loadConfig(){
    if(fs.existsSync('config.json')){
        console.log('Config File Found')
        return JSON.parse(fs.readFileSync('config.json'))
    } else {
        console.log('No Config File Found - Using Defaults')
        return {
            app : {name : "Server Homepage", port : 8080},
            systems : [
                {
                    "name": "No Systems Available",
                    "type": "server",
                    "baseurl": ip.address(),
                    "services": [
                        {
                            "name": "Add",
                            "service": "admin",
                            "port": "8080",
                            "url" : "editor",
                            "desc": "Add Systems"
                        }
                    ]
                }
            ]
        }
    }
    
}

app.use('/assets', express.static(path.join(__dirname, 'views/assets')))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.route('/')
    .get((req,res) => {
        config = loadConfig();
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

/**
 * getCurrentConfig
 * 
 * get : sends the current config as json
 */
app.route('/api/getCurrentConfig')
    .get((req,res) => {
        res.send(JSON.stringify(config, null, 2))
    })


/**
 * setConfig
 * 
 * post : Set the config file for server
 */
app.route('/api/setConfig')
    .post((req,res) => {
        let uploadConfig = req.body.config;

        fs.writeFile('config.json', JSON.stringify(uploadConfig, null, 2), (err) => {
            if(err){
                res.sendStatus(500);
            }

            config = loadConfig();

            res.sendStatus(200)
        })
    })

app.route('/api/readJSONFile')
    .post((req,res) => {
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, './tmp')
        form.parse(req, (err, fields, files) => {
            if(err){
                res.sendStatus(500);

                throw err
            } else {
                try {
                    let fileJson = JSON.parse(fs.readFileSync(files.configUpload.path))
                    res.status(200).send(fileJson);
                } catch (error) {
                    res.status(500).send('Verification Error');
                }

                fs.unlinkSync(files.configUpload.path)
            }
        })
    })

app.listen(port, () => {
    console.log(`Listening on http://${ip.address()}:${port}`)
})