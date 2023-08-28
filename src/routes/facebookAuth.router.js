const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const facebookRouter = express.Router();

const config = {
    CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "https://localhost:8000/facebook/auth/callback",
    profileFields: ['id', 'displayName', 'photos', 'gender'],
    enableProof: true
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new FacebookStrategy(AUTH_OPTIONS,verifyCallback));

facebookRouter.get('/auth',passport.authenticate('facebook',{
    scope: ['public_profile', 'email'],
}));

facebookRouter.get('/auth/callback',passport.authenticate('facebook',{
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false
}));

module.exports = facebookRouter;