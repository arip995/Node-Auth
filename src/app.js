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
const passport = require('passport');

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(helmet());
// Create a new cookie session middleware with the provided options. This middleware will attach the property session to req, which provides an object representing the loaded session. This session is either a new session if no valid session was provided in the request, or a loaded session from the request.

// The middleware will automatically add a Set-Cookie header to the response if the contents of req.session were altered. Note that no Set-Cookie header will be in the response (and thus no session created for a specific user) unless there are contents in the session, so be sure to add something to req.session as soon as you have identifying information to store for the session.
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ 'panda', 'pandashutup' ]
}));

//Save the session to the cookie
passport.serializeUser((user, done)=>{
    done(null,user.id);
});
//Read the session from the cookie
passport.deserializeUser((obj,done)=>{
    done(null, obj);
})
app.use(passport.session());

app.use('/google',googleAuthRouter);

app.use('/secret',secretRouter);

app.use('/github',githubRouter);

app.use('/facebook',facebookRouter);

app.use('/linkedin',linkedinRouter);

app.use('/discord',discordRouter);

app.use('/gitlab', gitlabRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
})

app.get('/failure', (req, res) => {res.send("Invalid credentials")});

module.exports = app;