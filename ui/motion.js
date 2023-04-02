// fake loader
$(".load").delay(2000).fadeOut();
$(".userUI").hide();

// Animation message
function MotionMessage() {
    $(".userUI").fadeIn();
    $(".aiUI").hide(1, function () {
        $(".aiUI").slideDown(600);
    });
}