const menu = document.querySelector('.menu span');
const nav = document.querySelector('.nav');
const links = document.querySelector('.nav-items');
const user = document.querySelector('.user');

$(document).ready(function(){

    scrollHide();

    $(".menu span").click(function(){

        nav.classList.toggle("expand");

        // show hide nav links on menu click with animation
        $(links).toggle("slow", function(){
            
        });

        // show hide user icon on menu click with animation
        $(user).toggle("slow", function(){

        });
    });

    // Makes sure that the NavItems are hidden if viewport is small to being with
    if($(window).width() < 883){
        hideNavItems();
    } 
    

    $( "li" ).each(function( index ) {
        // If the page loads with the window already scrolled past any of the sections
        if(window.scrollY >($(this).offsetHeight + $(this).offsetTop)){
            
        }
    });
});

function hideNavItems(){
    $(links).hide();
    $(user).hide();
}

function showNavItems(){
    $(links).show();
    $(user).show();
}

// This function is called very often it might be needed to throtle it somehow if it slowsdown the website
$(window).resize(function () {
   if($(window).width() < 883){
        hideNavItems();
        nav.classList.remove("expand");
    } else {
        showNavItems();
    }
});

// This function is called very often it might be needed to throtle it somehow if it slowsdown the website
$(window).scroll(function () {
    scrollHide();
});


function scrollHide() {

     if($(window).scrollTop() >= 250){
        $(nav).addClass("fixNav");
    }
    else{
        $(nav).removeClass("fixNav");
    }
}