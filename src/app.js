const express = require('express');
const helmet = require('helmet');
const path = require('path');
const googleAuthRouter = require('./routes/googleAuth.router');
const secretRouter = require('./routes/secret.router');
const githubRouter = require('./routes/githubAuth.router');
const facebookRouter = require('./routes/facebookAuth.router');
const linkedinRouter = require('./routes/linkedinAuth.router');
const discordRouter = require('./routes/discordAuth.router');

const app = express();
app.use(helmet());

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