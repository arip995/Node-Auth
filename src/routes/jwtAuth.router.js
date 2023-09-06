const express = require('express');
var jwt = require('jsonwebtoken');


const jwtAuthRouter = express.Router();

function generateAccessToken(){
    return jwt.sign(req.body.email, process.env.TOKEN_SECRET, { expiresIn: '864000' });
}


jwtAuthRouter.post('/auth',  (req, res) => {
    const token = generateAccessToken();
    return res.json(token);
});

module.exports = jwtAuthRouter;