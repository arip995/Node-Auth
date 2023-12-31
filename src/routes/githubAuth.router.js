const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const githubRouter = express.Router();

const config = {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/github/auth/callback",
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new GithubStrategy(AUTH_OPTIONS,verifyCallback));

githubRouter.get('/auth',passport.authenticate('github',{
    scope: ['user'],
}));

githubRouter.get('/auth/callback',passport.authenticate('github',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    // session: true
}));

module.exports = githubRouter;