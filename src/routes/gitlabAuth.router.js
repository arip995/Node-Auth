const express = require('express');
const passport = require('passport');
const GitlabStrategy = require('passport-gitlab2');
const gitlabRouter = express.Router();

const config = {
    CLIENT_ID: process.env.GITLAB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITLAB_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/gitlab/auth/callback",
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new GitlabStrategy(AUTH_OPTIONS,verifyCallback));

gitlabRouter.get('/auth',passport.authenticate('gitlab',{
    scope: ['api'],
}));

gitlabRouter.get('/auth/callback',passport.authenticate('gitlab',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    session: true
}));

module.exports = gitlabRouter;