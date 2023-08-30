const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const discordRouter = express.Router();

const config = {
    CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/discord/auth/callback",
    scope: ['identify', 'email']
}

function verifyCallback(accessToken, refreshToken, user, done) {
    console.log(user);
    console.log(accessToken);
    done(null,user);
}

passport.use(new DiscordStrategy(AUTH_OPTIONS,verifyCallback));

discordRouter.get('/auth',passport.authenticate('discord'));

discordRouter.get('/auth/callback',passport.authenticate('discord',{
    failureRedirect: "/failure",
    successRedirect: "http://localhost:3000",
    session: false
}));

module.exports = discordRouter;