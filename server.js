require('dotenv').config();
const fs = require('fs');
const https = require('https');
const http =require('http');
const app = require('./src/app');

// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
// }, app).listen(8000, () => {
//     console.log("server listening at port 8000")
// })

http.createServer(app).listen(8000,()=>{
    console.log('Server running at PORT 8000')
})