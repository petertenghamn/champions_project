const express = require('express');
const app = express();
const path = require('path');

// Routes
//const mysqlConnection = require("./connection");
const HomeRoutes = require("./routes/home");
const AboutRoutes = require("./routes/about");
const BlogRoutes = require("./routes/blog");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', HomeRoutes);
app.use("/about", AboutRoutes);
app.use("/blog", BlogRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
