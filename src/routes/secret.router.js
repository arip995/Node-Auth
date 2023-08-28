const express = require('express');

const secretRouter = express.Router();

secretRouter.get('/',(req,res) => {
    res.send("It's very secret Panda! What are you doin?? Save it");
});

module.exports = secretRouter;
