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

Router.get('/articles/update/:id&:title&:article_intro&:article_content&:article_conclusion', function (req, res) {
    let post = req.params.id;
    post = post.replace(':', '');



    res.send("worked!");
});

Router.get('/post/:id', (req, res) => {
    const post = req.params.id;
    // Query the DB for requested article and then send the data to the front-end
    mysqlConnection.query("SELECT article_id, date, title, article_intro, article_content, article_conclusion FROM articles WHERE article_id='" + post + "';", (err, rows, fields) => {
        if (!err && rows.length > 0){
            res.render('post',
                {
                    article_id:rows[0].article_id, date:dateFormat(rows[0].date, "mmm dd, yyyy"),
                    title:rows[0].title, article_intro:rows[0].article_intro, article_content:rows[0].article_content, article_conclusion:rows[0].article_conclusion
                });
        }
        else
            res.send('Post could not be found. ID left out of tempt test data on purpose.'); // Error message or 404
    });
});

Router.get('/comment/get/:id', function (req, res) {
    let post = req.params.id;
    post = post.replace(':', '');
    // Get the comments which are related to the specific post
    mysqlConnection.query("SELECT * FROM comments WHERE article_id='" + post + "';", (err, rows, fields) => {
        if (!err && rows.length > 0) {
            rows.forEach(element =>
                element.date = dateFormat(element.date, "mmm dd, yyyy")
            );
            res.send(rows);
        }
        else {
            console.log("No comments found.");
        }
    });
});

Router.put('/comment/put/:article_id&:username&:comment', function (req, res) {
    let post = (req.params.article_id).split(":")[1];
    let username = (req.params.username).split(":")[1];
    let comment = (req.params.comment).split(":")[1];
    if (username!=""&&comment!=""){
        let query = "INSERT INTO comments (article_id, username, date, comment) VALUES ('" + post + "', '" + username + "', curdate(), '" + comment + "');"
        mysqlConnection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Inserted: " + post + " | " + username + " | " + comment);
        });
    }
});

Router.put('/comment/delete/:id&:username&:article_id', function (req, res) {
    let username = (req.params.username).split(":")[1];
    // Verify that the user is an admin, if result is good, remove the comment
    let userQuery = "SELECT username FROM users WHERE username='" + username + "';"
    mysqlConnection.query(userQuery, (u_err, u_rows, u_result) => {
        if (!u_err && u_rows.length > 0){
            let article = (req.params.article_id).split(":")[1];
            let comment = (req.params.id).split(":")[1];
            // Remove the comment from the DB
            let query = "DELETE FROM comments WHERE comment_id='" + comment + "' AND article_id='" + article + "';"
            mysqlConnection.query(query, (err, result) => {
                if (err) throw err;
                console.log("Removed 1 comment from the DB.");
            });
        }
    });
});

module.exports = Router;