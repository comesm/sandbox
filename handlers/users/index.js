const { isEmpty, fetchData } = require('../../utils');
const config = require('config');
const friendSvcPort = config.get('friendServicePort');
const playSvcPort = config.get('playServicePort');

async function findMultiUser(req, res) {  
   let results; 
   let resultObj = {users: [], uri: '/users'};
   try {
     results = await fetchData('/friends', friendSvcPort);
     let resultSet = results.friends
       .map(({username, uri}) => 
         fetchUserData(username, uri, false))
         Promise.all(resultSet).then(response => {
           resultObj.users = resultObj.users.concat(response);
           res.json(resultObj);
         })  
   } catch(e) {
    return res.status(500).json({message: "error"});
   }
}

async function fetchSingleUser(req, res) {
   const user = req.params.username;
   let response; 
   try{
     response = await fetchUserData(user, null, true)
   } catch(e) {
     return res.status(500).json({message: "error"});
   }
   res.json(response);
}

async function fetchUserData(username, uri, indivUserFlag) {    
  let searchUri = !uri ? `/friends/${username}` : uri;
  let friend = {
    username,
    friends: null,
  };   
  try {
    let { friends } = await fetchData(searchUri, friendSvcPort);
    friends.friends = friends.length;
    let playUri = searchUri.replace('/friends', '/plays');
    let { plays } = await fetchData(playUri, playSvcPort);
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
    return friend;
    } catch (e) {
      return e;
    }
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