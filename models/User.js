const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const {Schema} = mongoose; this is equal to the previous line of code  

const userSchema = new Schema({
    googleId: String,
    givenName: String,
});

//this is model class or to create collection with name users
mongoose.model('users', userSchema);