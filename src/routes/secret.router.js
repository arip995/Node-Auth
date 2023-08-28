const express = require('express');

const secretRouter = express.Router();

secretRouter.get('/',(req,res) => {
    console.log(req.user)
    if(req.user){
        console.log(req.user)
        res.send("It's very secret Panda! What are you doin?? Save it");
    }else {
        res.status(500).json({message: 'Please log in'})
    }
});

module.exports = secretRouter;
