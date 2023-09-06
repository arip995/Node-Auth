const express = require('express');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');

const spotifyAuthRouter = express.Router();

const config = {
    CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/spotify/auth/callback",
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new SpotifyStrategy(AUTH_OPTIONS,verifyCallback));

spotifyAuthRouter.get('/auth',passport.authenticate('spotify',{
    scope: ['user-read-email', 'user-read-private'],
}));

spotifyAuthRouter.get('/auth/callback',passport.authenticate('spotify',{
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true
}));

module.exports = spotifyAuthRouter;