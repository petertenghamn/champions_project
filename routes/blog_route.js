const express = require("express");
const Router = express.Router();
const path = require("path");
const dateFormat = require('dateformat');
const mysqlConnection = require("../connection");

Router.get('/', (req, res) => {
    res.render('blog');
});

Router.get('/users/get', function (req, res) {
    // Retrieve a list of all the users within the DB
    mysqlConnection.query("SELECT username FROM users;", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    });
});

Router.post('/verify', function (req, res) {
    // Method used to verify that the login information is correct
    mysqlConnection.query("SELECT username, password, is_admin FROM users WHERE username='" + req.body.username + "' AND password='" + req.body.password + "';", (err, rows, fields) => {
        if (!err && rows.length > 0){
            res.send({ username:rows[0].username, admin:rows[0].is_admin}); // Send the user info to the front-end
        }
        else
            res.send("In-Valid");
    });
});

Router.get('/articles/get', function (req, res) {
    // Retrieve a list of all the articles within the DB
    mysqlConnection.query("SELECT article_id, date, title, snippet FROM articles;", (err, rows, fields) => {
        if (!err) {
            rows.forEach(element =>
                element.date = dateFormat(element.date, "mmm dd, yyyy")
            );
            res.send(rows);
        }
        else
            console.log(err);
    });
});

// Route to specific post where the user will have access to writing comments and admin can create new posts
Router.get('/post/:id', (req, res) => {
    const post = req.params.id;
    // Query the DB for requested article and then send the data to the front-end
    mysqlConnection.query("SELECT article_id, date, title, article_intro, article_content, article_conclusion FROM articles WHERE article_id='" + post + "';", (err, article_rows, fields) => {
        if (!err && article_rows.length > 0){
            // TODO: include the comments of the article
            // Secondary query to get comments

            res.render('post',
                {
                    article_id:article_rows[0].article_id, date:dateFormat(article_rows[0].date, "mmm dd, yyyy"),
                    title:article_rows[0].title, article_intro:article_rows[0].article_intro, article_content:article_rows[0].article_content, article_conclusion:article_rows[0].article_conclusion
                });
        }
        else
            res.send('Post could not be found. ID left out of tempt test data on purpose.'); // Error message or 404
    });
});

Router.get('/comment/get', function (req, res) {


    res.send("worked!");
});

Router.put('/comment/put', function (req, res) {


    res.send("worked!");
});

module.exports = Router;