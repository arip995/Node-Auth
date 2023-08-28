require('dotenv').config();
const fs = require('fs');
const https = require('https');
const app = require('./src/app');

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(8000, () => {
    console.log("server listening at port 8000")
})