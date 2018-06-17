const { isEmpty, fetchUsers } = require('../../utils');
const config = require('config');
const friendSvcPort = config.get('friendServicePort');
const playSvcPort = config.get('playServicePort');

function findMultiUser(req, res) {  
    return fetchUsers('/friends', friendSvcPort)
       .then(results => {
        let resultObj = {users: [], uri: '/users'};
           let resultSet = results.friends.map(({username, uri}) => {
        //    let friend = {
        //      friends: null,
        //      username,
        //      plays: null,
        //      uri: uri.replace('/friends', '/users')
        //     };
             return fetchUserData(username, uri)

            // return new Promise((resolve, reject) => {
            //    fetchUsers(uri, friendSvcPort)
            //      .then(({ friends }) => {
            //        friend.friends = friends.length;       
            //        let playUri = uri.replace('/friends', '/plays');
            //        fetchUsers(playUri, playSvcPort)
            //          .then(({ plays }) => {
            //            friend.plays = plays.length;  
            //            resolve(friend);  
            //          }) 
            //     })
            // });
        });
        Promise.all(resultSet).then(response => {
           console.log(response);
           resultObj.users = resultObj.users.concat(response);
           res.json(resultObj);
        })          
     });
}

function fetchUserData(username, uri) {
    let friend = {
        friends: null,
        username,
        plays: null,
        uri: uri.replace('/friends', '/users')
    };   
  return new Promise((resolve, reject) => {
    fetchUsers(uri, friendSvcPort)
      .then(({ friends }) => {
      friend.friends = friends.length;       
      let playUri = uri.replace('/friends', '/plays');
      fetchUsers(playUri, playSvcPort)
        .then(({ plays }) => {
          friend.plays = plays.length;  
          resolve(friend);  
        }) 
      })
    });
};


module.exports.findMultiUser = {
  
  handler(req, res) {
    findMultiUser(req, res); 
  },
  
  validate(req, res, next) {
      
    if(!isEmpty(req.query)) {
       return res.status(400)
         .send({error: "bad request"});
    }
    next();
  }


}