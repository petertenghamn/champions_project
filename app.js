const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const mysqlConnection = require("./connection");
const AboutRoutes = require("./routes/about_route");
const BlogRoutes = require("./routes/blog_route");

// declaration of frontend static files NO NEED TO DECLARE THEM ANYWHERE ELSE OR SEND THEM
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/assets', express.static(__dirname + 'public/assets'));

app.use("/about", AboutRoutes);
app.use("/", BlogRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get and Put methods using the DB
app.get('/users/get', function (req, res) {
  // Retrieve a list of all the users within the DB
  mysqlConnection.query("SELECT username FROM users;", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    }
    else
      console.log(err);
  });
});

app.post('/verify', function (req, res) {
  // Method used to verify that the login information is correct
  mysqlConnection.query("SELECT username, password, is_admin FROM users WHERE username='" + req.body.username + "' AND password='" + req.body.password + "';", (err, rows, fields) => {
    if (!err){
      if (rows.length > 0)
        res.send({ username:rows[0].username, admin:rows[0].is_admin}); // Send the user info to the front-end
      else
        res.send("In-Valid");
    }
    else
      res.send("In-Valid");
  });
});

app.get('/articles/get', function (req, res) {
  // Make a class to hold the different variable structures
  var articles;

  // Sends the data to the site to be used
  res.send(articles);
});

app.get('/article/get/', function (req, res) {


  res.send("worked!");
})

app.get('/comment/get', function (req, res) {


  res.send("worked!");
});

app.put('/comment/put', function (req, res) {


  res.send("worked!");
});



// PUT comment request which is called in the uploadComment() under user.js
/*
app.put('/comment', function (req, res) {
  var html = [];

  //  THIS IS JUST AN EXAMPLE OF HOW I WOULD REFRESH THE COMMENTS SECTION FEEL FREE TO DO IT    *  YOUR WAY!

  // database query
  con.query("SELECT * FROM table1 ORDER BY Timestamp DESC", function (err, result) {
    if (err) throw err;

    resultJSON = JSON.parse(JSON.stringify(result));

    console.log(resultJSON);


    // .push acts as a StringBuilder in Java
    html.push(

    );

    res.send(html.join(""));
  });
});
*/

/*
app.get("/games", ((req, res) => {
  mysqlConnection.query("SELECT * FROM games;", (err, rows, fields) => {
    if (!err){
      res.send(rows);
    }
    else {
      console.log(err);
    }
  })
}));
*/


// Setup listener for the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));