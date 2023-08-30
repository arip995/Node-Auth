const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const twitterRouter = express.Router();

const config = {
    CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    consumerKey: config.CLIENT_ID,
    consumerSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/twitter/callback",
    // scope: ['identify', 'email']
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null,profile);
}

passport.use(new TwitterStrategy(AUTH_OPTIONS,verifyCallback));

twitterRouter.get('/auth',passport.authenticate('twitter',{
    scope: ['user']
}));

twitterRouter.get('/auth/callback',passport.authenticate('twitter',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    session: false
}));

module.exports = twitterRouter;