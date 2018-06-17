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
async function fetchData(uri, port) {
      let result;
       try {
        result = await 
          fetch(`http://localhost:${port}${uri}`);
        return result.json();
       } catch(e) {
           return e.json();
       }
}