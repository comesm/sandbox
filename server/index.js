'use strict'
const singleUserHandler = require('../handlers/singleUser');
const multiUserHandler = require('../handlers/users');
const compression = require('compression');

const routes = {  
    
    
    register(app) {
        
      app.use(compression());

      app.get('/users',
        multiUserHandler.findMultiUser.validate,
        multiUserHandler.findMultiUser.handler       
      )  
              
      app.get('/users/:username',
        singleUserHandler.findUser.validate,
        singleUserHandler.findUser.handler  
      )
      
    }
}



module.exports.create = function (callback) {

    callback(routes);
}