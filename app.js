const express = require('express');
const app = express();
const path = require('path');

// Routes
//const mysqlConnection = require("./connection");
const AboutRoutes = require("./routes/about_route");
const BlogRoutes = require("./routes/blog_route");

// declaration of frontend static files NO NEED TO DECLARE THEM ANYWHERE ELSE OR SEND THEM
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/assets', express.static(__dirname + 'public/assets'));

app.use("/about", AboutRoutes);
app.use("/", BlogRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PUT comment request which is called in the uploadComment() under user.js 
app.put('/comment', function (req, res) {

  var html = [];

  /**
   *  THIS IS JUST AN EXAMPLE OF HOW I WOULD REFRESH THE COMMENTS SECTION FEEL FREE TO DO IT    *  YOUR WAY!
   */

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