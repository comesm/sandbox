const { isEmpty, fetchData } = require('../../utils');
const config = require('config');
const friendSvcPort = config.get('friendServicePort');
const playSvcPort = config.get('playServicePort');

function findMultiUser(req, res) {  
    return fetchData('/friends', friendSvcPort)
       .then(results => {
        let resultObj = {users: [], uri: '/users'};
           let resultSet = results.friends
             .map(({username, uri}) => 
               fetchUserData(username, uri, false)
        );
        Promise.all(resultSet).then(response => {
           resultObj.users = resultObj.users.concat(response);
           res.json(resultObj);
        })          
     });
}

function fetchSingleUser(req, res) {
   const user = req.params.username;
   return fetchUserData(user, null, true)
    .then(responseObj => {
        res.json(responseObj);
    })
    .catch(err => {
        res.status(500).json({err:"Internal Server Error"});
    })
}

function fetchUserData(username, uri, indivUserFlag) {    
  let searchUri = !uri ? `/friends/${username}` : uri;
  let friend = {
    username,
    friends: null,
  };   
  return new Promise((resolve, reject) => {
    fetchData(searchUri, friendSvcPort)
      .then(({ friends }) => {
      friend.friends = friends.length;       
      let playUri = searchUri.replace('/friends', '/plays');
      fetchData(playUri, playSvcPort)
        .then(({ plays }) => {
          if(!indivUserFlag) {
            friend.plays = plays.length; 
          }  
          else if(indivUserFlag) {
            let trackSet = new Set(); 
            plays.forEach(track => 
              trackSet.add(track));
            friend.tracks = trackSet.size;   
          }
          friend.uri = searchUri.replace('/friends', '/users');  
          resolve(friend);  
        }) 
      })
    });
};


module.exports.find = {
  
  handler(req, res) {
   if(req.params.username) {
    fetchSingleUser(req, res);
   } else {
    findMultiUser(req, res); 
   }     
},
  
  validate(req, res, next) { 
    if(!isEmpty(req.query)) {
       return res.status(400)
         .send({error: "bad request"});
    }
    next();
  }


}