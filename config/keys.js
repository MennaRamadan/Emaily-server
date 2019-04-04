//keys.js to figure out what set of credentials to return
if (process.env.NODE_ENV === 'production'){
    //we are in production so return the prod keys
    module.exports = require('./prod');
}
else{
   //we are in development so return dev keys 
   module.exports = require('./dev');
}