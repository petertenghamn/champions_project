# The Champions Blog

This was a website developed for **HKR** course [DA377B VT21](https://www.hkr.se/en/course/DA377B/course-syllabus). The website was developed using Node.JS, Jquery / JavaScript, CSS, HTML, EJS, MySQL. This website belongs to Group 12. 

Group 12: 

Öjvind Nilsson & Peter Tenghamn

## Frontend

*This section goes over the development of the front-end of the website developed by Öjvind Nilsson*

### Home Page

![home_demo_small](https://user-images.githubusercontent.com/45008469/109724652-2fb84c80-7bb0-11eb-86bc-2612ccdb1211.gif)

The Home Page acts as the base of operations of the website and is where all the posts are displayed to the user. This page is also heavily manipulated through CSS in order to get the feeling of the page just right. The first thing to notice is the navigation bar at the top of the page *(See Navbar Section for more)*. 

Moving on from the navbar the first example of grid CSS is shown. Grid CSS is used thorughout the website to format the display arrangement of different <div> tags and <section> tags.  Here it is used to place the blog description and the subscribed users side by side. Speaking of which the subscribed users is done with a library for JavaScript called Glide.JS, this library makes it easy to setup a highly customizable carrousel and is also used in the About Page.  
  
The next thing that is interesting about the home page is that with the combination of the pop up *(See Pop Up Section for more)* some aspects are blocked off untill the user has logged in to certain accounts. For example, if the user is logged in to an admin account they get access to the comment button and the edit post button, the former of which will route the admin to the Edit Post "secret" page *(See Edit Page Section for more)*. 

#### Navbar

![navbar_demo](https://user-images.githubusercontent.com/45008469/109724747-51193880-7bb0-11eb-88a6-5ed61c29f1be.gif)

The navbar is the place where the user can navigate throughout the website. It is made using the <header> tag in html and vast scripting using a mix of Jquery and JavaScript. The navbar is reactive to the window size as when the window size a CSS @mediaquery is called to reformat how the navbar looks. Otherwise, it is also manipulated using Jquery to help re arrange the items inside the navbar to better work for a smaller screen. This is shown in the code below.


    $(window).resize(function () {
    if ($(window).width() < 883) {
        hideNavItems();
        nav.classList.remove("expand");
    } else {
        showNavItems();
    }
    });
 
 Another way that the navbar is manipulated through Jquery / JavaScript is the way that the navbar keeps track of where the user is in the entire website. The code below shows how the url path of the page the user is on is taken and then compared to see which link to highlight by using the Jquery addClass() function. This is the same technique being used to underline the link that is hovered over.
 
    function highlightCurrentLink() {
    var url = window.location.href; // Returns full URL (https://example.com/path/example.html)
    const links = document.querySelectorAll(".nav-link");

    links.forEach(function (linkItem) {
        if (url.includes("about")) {
            if (linkItem.id.includes("about")) {
                $(linkItem).addClass("currentLocation");

            }
        } else if (url.includes("post")) {
            if (linkItem.id.includes("editing")) {
                $(linkItem).addClass("currentLocation");

            }
        } else {
            if (linkItem.id.includes("home")) {
                $(linkItem).addClass("currentLocation");
            }
        }
    });
    }
    
#### Pop Up

![popup_demo](https://user-images.githubusercontent.com/45008469/109725024-d270cb00-7bb0-11eb-94e0-1e1f80496f76.gif)

The pop up appeares when the user clicks on the user icon on the top right of the navbar. This is a combination of CSS and Jquery as usual. CSS is cleverly used to hide the HTML tags that make up the pop up which are then enabled through JavaScript in the same way that the navbar highlighting was done. The way that the dark overlay is done is simply making a <div> tag that takes up the entire size of the HTML and is a low opacity of black. The way that the overlay doesn't disturb the pop up is by changing the CSS z-index property of the popup iteself. A new Addition to the pop up is the JQuery function of hide() and show() which are used to hide and show respectivly different parts of popup when appropriate *(Shown in the following code)*.


    $(registerTitle).click(function() {
     // Hides the error messages if any are showing
     $(err1).hide("slow");
     $(err2).hide("slow");
     $(err3).hide("slow");
     $(err4).hide("slow");

     // Makes sure that the current tab is highlighted
     $(registerTitle).addClass("highlighted");
     $(loginTitle).removeClass("highlighted");

     $(confirm).show("slow");
     $(email).show("slow");
     $(registerBtn).show("slow");

     $(loginBtn).hide("slow");
    });

Another addition in JQuery that the pop up uses is the ability to hinder the user from doing certain actions. The following code shows the way that the page prevents the user from scrolling down the page while the pop up is active.

    // call this to Disable
    function disableScroll() {
     $("html").css("overflow-y", "hidden");

     window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
     window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
     window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
     window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }
    
    function preventDefault(e) {
      e.preventDefault();
    }

### About Page

![about_demo](https://user-images.githubusercontent.com/45008469/109724165-6b9ee200-7baf-11eb-98af-7c3417d2ccf6.gif)

The About Page is mostly just CSS and the use of both Grid CSS and Flexbox CSS in combination with @mediaqueries in order to make sure that the contents are reactive to window size changes. The only front end noteworthy thing in this page is the use of negative margins to have overlap in some areas of the page such as the **HKR** logo.

### Edit Page

![edit_demo](https://user-images.githubusercontent.com/45008469/109725214-1cf24780-7bb1-11eb-881a-5401616743ef.gif)


The Edit page is pretty straight foward in terms of Javascript and CSS, in terms of the frontend atleast, as it uses the page cookie of `document.cookie = "username=" + username + "; path=/";` to verify that the user logged in is indeed an admin. This cookie is also used to track that the user is logged in throught the website domain.

## Backend

*This section goes over the development of the back-end of the website developed by Peter Tenghamn*

Design options : Node.js, Express API, MySQL

### Structure

The structure we choose to use and build the project around is Node.js with the Express API. We decided to use a Database we have used before, which is MySQL, making creating the database something familiar to what we have done before.

### Database

    -- -----------------------------------------------------
    -- Schema champions_db
    -- -----------------------------------------------------
    CREATE SCHEMA IF NOT EXISTS `champions_db` DEFAULT CHARACTER SET utf8 ;
    USE `champions_db` ;

The database was designed to be very simple at first and when the website expanded, more was added to the database structure.

The database contains 3 main tables which are used to populate the core of the website.

 - A user table to contain usernames and passwords, along with the boolean of admins, which can only be changed via direct changes in the database.
 - Article table containing each section of the article which will be used to construct the blog in a template. The article contains an admin who wrote the article along with all the details which the article has.
 - Comments table, which has the foreign key from the user who wrote it, along with the key of the article in which it was written on.
 
These 3 core tables make up the construction of the blog and each individual post. A base set of information is also written into the MySQL script so that testing can easily be done.

### Routing

    app.use("/about", AboutRoutes);
    app.use("/", BlogRoutes);
    app.use("/brainstorm", BrainstormRoutes);

To organize the project, the main app.js contains the primary routes used to construct the website, while the specified routes have the more complex functions that are needed for that route to function.

    Router.get('/', (req, res) => {
        res.render('blog');
    });
    
    Router.get('/users/get', function (req, res) {
        // code is here too
    });
    
    Router.post('/verify', function (req, res) {
        // code is here too
    });
    
    Router.post('/register', function (req, res) {
        // code is here too
    });

The routes sub routes are designed to complete any function needed for that page. The method implemented is to initialy construct the page, and then call methods to populate it using information retrieved from the database.
A combination of cookies creating a profile of the verified user logged in and restrictions and checks from the methods is used to allow for reliable access to the web pages while ensuring security of the pages.

### Ajax requests

    $(document).ready(function () {
            // User Carousel Update from the DB
            function updateCarousel() {
                $.ajax({
                    url: '/users/get',
                    contentType: 'application/json',
                    success: function (response) {

We implemented ajax calls when the front-end is initialized to call url requests to populate the information.
Additional ajax calls are implemented on button presses by the user to call for specific services, such as verifying that the information is correct or creating a new comment which has an integrated dynamic update for the web page after having updated the database with the new information.

### Queries

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

Queries to the database are kept in the route specific for that page and function in a basic format to reduce the risk of any errors occuring.
Any formating of the data that is needed to be done to the data before it is ready to be displayed, is handeled in the back-end before sending the response back to the client requesting the data.

### Template Construction

    response.forEach(element =>
                                trHTML +=
                                '<li class="glide__slide">' +
                                '<img src="assets/vectors/user_avatars/001-man.svg" alt="User Avatar">' +
                                '<h3>' + element.username + '</h3>' +
                                '</li>'
                            );

The response of the queries, when recieved is applied to a template to display it in a readable format for the user.
This makes things easy to read along with adding the benifite of easily being able to change how the information is displayed without having to look for multiple locations where the content could be formated.
