const express = require('express');
const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const linkedinRouter = express.Router();

const config = {
    CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "https://localhost:8000/linkedin/auth/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new LinkedinStrategy(AUTH_OPTIONS,verifyCallback));

linkedinRouter.get('/auth',passport.authenticate('linkedin'));

linkedinRouter.get('/auth/callback',passport.authenticate('linkedin',{
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false
}));

module.exports = linkedinRouter;