const express = require("express");
const Router = express.Router();
const path = require("path");
const dateFormat = require('dateformat');
const mysqlConnection = require("../connection");

Router.get('/', (req, res) => {
    // TODO: Verify the user is an admin, otherwise send the user to the home page
    let cookie = document.cookie;
    console.log(cookie);

    res.render('brainstorm');
});

module.exports = Router;