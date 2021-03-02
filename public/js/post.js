const btn_submit = document.querySelector("#btn-submit");

$(document).ready(function () {

  // This hides the different error messages when clicked
  $("[id^=err]").click(function () {
    // Gets the ID of the button that was clicked
    var id = $(event.target)[0].id;

    $("#" + id).hide("slow");
  });

  $(btn_submit).click(function () {
    console.log("Clicked");

    var valid = validateLogin();

    if (valid) {
      // TODO edit post when submit is clicked
    }
  });
});

/**
 * Checks to see if the pass and username are in the database
 * 
 * return valid true: validation successful false: validation failed
 */
function validateLogin() {
    var title = $("#title").val();
    var description = $("#description").val();

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

    // description
    if (!description.trim()) {
      $(err2).show("slow");
      $("#err2").text("Description can NOT be Empty!");
    } else {
      $(err2).hide("slow");
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
