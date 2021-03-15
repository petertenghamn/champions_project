const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const AboutRoutes = require("./routes/about_route");
const BlogRoutes = require("./routes/blog_route");
const BrainstormRoutes = require("./routes/brainstorm_route");

// declaration of frontend static files NO NEED TO DECLARE THEM ANYWHERE ELSE OR SEND THEM
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/assets', express.static(__dirname + 'public/assets'));

app.use("/about", AboutRoutes);
app.use("/", BlogRoutes);
app.use("/brainstorm", BrainstormRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setup listener for the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http:\\localhost:${port}`));