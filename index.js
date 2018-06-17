'use strict'

const http = require('http');
const express = require('express');
const config = require('config');
const appName = config.get('appName');
const listenUpport = config.get('listenUpport');


const app = express();

/**
 * call our register function
 * which will add our routes
 * and middleware
 */

require('./server').create(({ register }) => {
    
    register(app);

    http.createServer(app).listen(listenUpport, (err, data) => { 
        console.info(`Server ${appName} is listening on port: ${listenUpport}`);
    })

});