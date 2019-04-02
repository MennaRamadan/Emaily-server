const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys');


//one argument means we need to load user, 2 argument we need to add to user
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //here is we return the Id not the googleId as we may use facebookId
    //will add this to cookie
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then(user => (done(null, user)));
});

passport.use(new GoogleStrategy({
    clientID: Keys.googleClinetID,
    clientSecret: Keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log('access token',accessToken);
        // console.log('Refresh token',refreshToken);
        // console.log('Profile',profile);

        User.findOne({googleId : profile.id }).then((existingUser) => {
            if(existingUser){
                //we already have record witht the given Id
                //the following line of code indeicate of we have done and also here is the existing user
                done(null, existingUser);
            }
            else{
                //there is no record with this ID so create this
                new User({
                    googleId: profile.id,
                    givenName: profile.name.givenName
                }).save().then(user => done(null,user));
            }
        })

    })
);