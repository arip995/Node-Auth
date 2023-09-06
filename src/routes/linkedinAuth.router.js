const express = require('express');
const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const linkedinAuthRouter = express.Router();

const config = {
    CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/linkedin/auth/callback",
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new LinkedinStrategy(AUTH_OPTIONS,verifyCallback));

linkedinAuthRouter.get('/auth',passport.authenticate('linkedin',{
    scope: ['email']
}));


linkedinAuthRouter.get('/auth/callback',passport.authenticate('linkedin',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    session: false
}));

module.exports = linkedinAuthRouter;