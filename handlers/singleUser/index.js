const { isEmpty } = require('../../utils');

function findSingleUser(req, res) {
  
    res.json({message: "single user worked"});
    
}





module.exports.findUser = {
  
  handler(req, res) {
    findSingleUser(req, res); 
  },
  
  validate(req, res, next) {
    if(!isEmpty(req.query)) {
       return res.status(400).send({error: "bad request"});
    }
    next();
  }


}