const user_img = document.querySelector("#user-avatar");

$(document).ready(function () {

    // Set the picture when the document loads
    setPicture();

    $(user_img).click(function () {
        console.log("click");
        randomizePicture();
    });
});

/**
 *
 * @param {returns the cookie with the name of cname} cname
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Randomizes the picture that is used to identify the user
 * 
 * TODO: Save picture in the DB as either an image or path
 * 
 *  ** COULD CHANGE THIS TO PICK A PIC FROM THE DATABASE ** 
 */
function randomizePicture() {

    // Bounded to 9 because there are 9 pics with the same name in public\assets\vectors\user_avatars
    var random = Math.floor(Math.random() * 9 + 1);

    var path = "assets/vectors/user_avatars/00" + random + "-man.svg"; // This could be how it's saved in the DB if images can't be saved.

    $(user_img).attr("src", path)

}

/**
 * Sets the picture that is saved in the DB
 * 
 *  TODO load the picture from the database
 */
function setPicture(){
    var path = "assets/vectors/user_avatars/010-woman.svg";

    $(user_img).attr("src", path);
}

/**
 * Validates that the comment is appropriate before uploading
 * 
 * @param {The ID of the post} id 
 */
function validateComment() {
    var comment = $("#new-comment").val();
    var errorContainer = "#errComment";

    var valid = true;

    if (!comment.trim()) {

        $(errorContainer).show("slow");
        $(errorContainer).text("Comment is Empty!");

        valid = false;
    } else {
        $(errorContainer).hide("slow");

        valid = true;
    }

    return valid;
}