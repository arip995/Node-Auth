const express = require('express');
const passport = require('passport');
const AmazonStrategy = require('passport-amazon').Strategy;
const amazonAuthRouter = express.Router();

const config = {
    CLIENT_ID: process.env.AMAZON_CLIENT_ID,
    CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/amazon/auth/callback",
    scope: ['profile']
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new AmazonStrategy(AUTH_OPTIONS,verifyCallback));

amazonAuthRouter.get('/auth',passport.authenticate('amazon'));

amazonAuthRouter.get('/auth/callback',passport.authenticate('amazon',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    session: true
}));

module.exports = amazonAuthRouter;