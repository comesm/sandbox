const fetch = require('node-fetch');

module.exports = {
    isEmpty,
    fetchUsers
}


function isEmpty(obj) {
  return Object.keys(obj).length === 0 
    && obj.constructor === Object

}

function fetchUsers(uri, port) {

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${port}${uri}`)
          .then(results => { 
              resolve(results.json());
          }
        )
        .catch(err => reject(err));
    })
}