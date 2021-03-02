const express = require("express");
const Router = express.Router();
const path = require("path");

// A listing of all the posts we have created with a snippet of the details of that post
// A button should be at the bottom of each snippet stating "Read more" or similar to get the full post
// Next to the button a number representing the number of comments could be displayed as well?

Router.get('/', (req, res) => {


    // Temp data to simulate retrieving it from the DB
    // img can just be a string to the path of the image if not possible to store gif in database
    const tempData = [
      {
        img: "assets/gifs/demo_MapleStory.gif",
        title: "Flappy Bird",
        snippet: "An arduino based game.",
        id: 1,
        comments: 3,
      },
      {
        img: "assets/gifs/demo_MapleStory.gif",
        title: "Pokemon",
        snippet: "First game group project using java.",
        id: 2,
        comments: 42,
      },
      {
        img: "assets/gifs/demo_MapleStory.gif",
        title: "Dungeon Delver",
        snippet: "A turned based combat game made for android.",
        id: 3,
        comments: 13,
      },
    ];

    res.render('blog', { posts: tempData })

    
});

// Route to specific post where the user will have access to writing comments and admin can create new posts
Router.get('/post/:id', (req, res) => {
    const post = req.params.id;

    // Temp data to simulate retrieving it from the DB
    const tempData = [
        {title: "Flappy Birb", description: "A arduino based game. This is totally a longer description. There were cacti!", id: 1},
        {title: "Pokemon", description: "First game group project using java. CATCH DEM ALL! WOOOO!", id: 2},
    ];

    let found = false;
    for (let i = 0; i < tempData.length; i++){
        if (tempData[i].id === parseInt(post)){
            res.render('post', { title: tempData[i].title, description: tempData[i].description })
            found = true;
            break;
        }
    }
    if (!found) res.send('Post could not be found. ID left out of tempt test data on purpose.'); // Error message or 404
});

module.exports = Router;