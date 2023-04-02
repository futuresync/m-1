// fake loader
$(".load").delay(2000).fadeOut();

// Animation message
function MotionMessage() {
    $(".aiUI").hide(1, function () {
        $(".aiUI").slideDown(600);
    });
}