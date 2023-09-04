const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const googleAuthRouter = require('./routes/googleAuth.router');
const secretRouter = require('./routes/secret.router');
const githubRouter = require('./routes/githubAuth.router');
const facebookRouter = require('./routes/facebookAuth.router');
const linkedinRouter = require('./routes/linkedinAuth.router');
const discordRouter = require('./routes/discordAuth.router');
const gitlabRouter = require('./routes/gitlabAuth.router');
const twitterRouter = require('./routes/twitterAuth.router');
const passport = require('passport');

const app = express();
const config = {
    KEY: process.env.COOKIE_KEY,
}
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(helmet());
// Create a new cookie session middleware with the provided options. This middleware will attach the property session to req, which provides an object representing the loaded session. This session is either a new session if no valid session was provided in the request, or a loaded session from the request.

// The middleware will automatically add a Set-Cookie header to the response if the contents of req.session were altered. Note that no Set-Cookie header will be in the response (and thus no session created for a specific user) unless there are contents in the session, so be sure to add something to req.session as soon as you have identifying information to store for the session.

//It prepares how the session will look like and signs the userd login data with keys
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.KEY]
}));

//Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user);
});
//Read the session from the cookie and add useful functions like logout to req
passport.deserializeUser((obj, done) => {
    done(null, obj);
})
//Put the user into the req
app.use(passport.session());

app.use('/google', googleAuthRouter);

app.use('/secret', secretRouter);

app.use('/github', githubRouter);

app.use('/facebook', facebookRouter);

app.use('/linkedin', linkedinRouter);

app.use('/discord', discordRouter);

app.use('/gitlab', gitlabRouter);

app.use('/twitter', twitterRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.get('/failure', (req, res) => { 
    res.send("Invalid credentials") 
});

app.get('/logout', (req, res) => {
    console.log(req.user)
    req.logOut();
    res.redirect('/')
});

module.exports = app;