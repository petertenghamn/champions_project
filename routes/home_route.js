const express = require("express");
const Router = express.Router();
const path = require("path");

Router.get('/', (req, res) => {
    res.sendFile(path.resolve('html/home.html'));
});

module.exports = Router;