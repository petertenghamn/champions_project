const express = require("express");
const Router = express.Router();
const dateFormat = require('dateformat');
const mysqlConnection = require("../connection");

Router.get('/', (req, res) => {
    res.redirect("/");
})

Router.get('/:username', (req, res) => {
    // Verify the user is an admin, otherwise send the user to the home page
    let username = (req.params.username).split(":")[1];
    let query = "SELECT username FROM users WHERE username='" + username + "' AND is_admin='1';";
    mysqlConnection.query(query, (err, rows, result) => {
        if (!err && rows.length > 0) {
            res.render('brainstorm');
        }
        else {
            console.log("missing requirement, sending to home page.");
            res.redirect("/");
        }
    });
});

module.exports = Router;