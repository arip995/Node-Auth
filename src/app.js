const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieSession = require('cookie-session');
const googleAuthRouter = require('./routes/googleAuth.router');
const secretRouter = require('./routes/secret.router');
const githubRouter = require('./routes/githubAuth.router');
const facebookRouter = require('./routes/facebookAuth.router');
const linkedinRouter = require('./routes/linkedinAuth.router');
const discordRouter = require('./routes/discordAuth.router');
const passport = require('passport');

const app = express();
app.use(helmet());
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
})

app.get('/failure', (req, res) => {res.send("Invalid credentials")});

module.exports = app;