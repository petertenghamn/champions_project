$(document).ready(function () {

  var usernameCookie = getCookie("username");

  if(usernameCookie == "" || usernameCookie == null){
    window.location.href = "http://localhost:3000/";
  }

  // This hides the different error messages when clicked
  $("[id^=err]").click(function () {
    // Gets the ID of the button that was clicked
    var id = $(event.target)[0].id;

    $("#" + id).hide("slow");
  });

  
});

/**
 * Checks to see if the pass and username are in the database
 * 
 * return valid true: validation successful false: validation failed
 */
function validateSubmit() {
    var title = $("#edt_title").val();
    var intro = $("#edt_article_intro").val();
    var content = $("#edt_article_content").val();
    var conclusion = $("#edt_article_conclusion").val();

    // In order title, description
    var validated = [false, false];

    // title
    if (!title.trim()) {
        $(err1).show("slow");
        $("#err1").text("Title can NOT be empty!");
    } else {
      $(err1).hide("slow");
      validated[0] = true;
    }

    // intro
    if (!intro.trim()) {
      $(err2).show("slow");
      $("#err2").text("Intro can NOT be Empty!");
    } else {
      $(err2).hide("slow");
      validated[1] = true;
    }

    // content
    if (!content.trim()) {
        $(err3).show("slow");
        $("#err3").text("Content can NOT be Empty!");
    } else {
        $(err3).hide("slow");
        validated[1] = true;
    }

    // intro
    if (!conclusion.trim()) {
        $(err4).show("slow");
        $("#err4").text("Conclusion can NOT be Empty!");
    } else {
        $(err4).hide("slow");
        validated[1] = true;
    }

    var valid = true;

    var i;
    for (i = 0; i < validated.length; i++) {
        if (!validated[i]) {
            valid = false;
        }
    }

    return valid;
}
