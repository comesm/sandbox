const fetch = require('node-fetch');

module.exports = {
    isEmpty,
    fetchData
}


function isEmpty(obj) {
  return Object.keys(obj).length === 0 
    && obj.constructor === Object

}
/**
 * fetch wrapper function
 */
function fetchData(uri, port) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${port}${uri}`)
          .then(results => { 
              resolve(results.json());
          }
        )
        .catch(err => reject(err));
    })
}