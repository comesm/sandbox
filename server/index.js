'use strict'
const userHandler = require('../handlers/users');
const compression = require('compression');

const routes = {  
    
      /**
       * define a function that when called will
       * register middleware and routes below  
       * 
       */
    
    register(app) {
        
      app.use(compression());

      app.get('/users',
      userHandler.find.validate,
      userHandler.find.handler       
      )  

      app.get('/users/:username',
        userHandler.find.validate,
        userHandler.find.handler  
      )      
    }
}

module.exports.create = function (callback) {
    callback(routes);
}