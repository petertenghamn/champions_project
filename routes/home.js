const express = require("express");
const Router = express.Router();
const path = require("path");

Router.get('/', (req, res) => {
    res.sendFile(path.resolve('html/home.html'));
});

// stylesheet endpoint, only expected to be used by html files
Router.get('/general', (req, res) => {
    res.sendFile(path.resolve('public/stylesheets/general.css'));
});

module.exports = Router;