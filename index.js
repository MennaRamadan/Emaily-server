//not supported in es that used in node
//import express from 'express';

const express = require('express');
const mongoose = require('mongoose');
//to get access to cookie
const cookieSession = require('cookie-session');
//will make passport handle this
const passport = require('passport');
const Keys = require('./config/keys');
require('./models/User');
require('./services/pasport');


mongoose.connect(Keys.mongoURI);
const app = express();

//maxAge: this mean period till it will expaire the following line mean 30 days and expire
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [Keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;


app.listen(PORT, function(){
    console.log("Emaily API running on port " + PORT +"!");
});




//we must load user first or model beffore loading passport
//node, express, passport, google oAuth, nodemon


//I wrote PORT with capital letters to show other engineers that this const not changed in future
//In this line of code when heroku run our app. it will inject enviroment variables in our code and we will wait until run our app to be able to tell us which port for the app
//also here we handle working on both local machine or deployment on heroku


