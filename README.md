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

*This section goes over the development of the front-end of the website developed by Peter Tenghamn*

**TODO write md on backend**
