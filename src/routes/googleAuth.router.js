const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/google/auth/callback",
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null,profile);
}

passport.use(new GoogleStrategy(
    AUTH_OPTIONS,
    verifyCallback
))

const googleAuthRouter = express.Router();

googleAuthRouter.get('/auth', passport.authenticate('google', {
    scope: ['email','profile']
}));

googleAuthRouter.get('/auth/callback', passport.authenticate('google',{
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true
}), (req,res)=>{});

googleAuthRouter.get('/auth/logout', (req,res)=>{
    req.logOut();
    res.redirect('/')
});

googleAuthRouter.get('/', (req,res)=>{
    res.status(200).json({name: "panda"})
});

module.exports = googleAuthRouter;