$(document).ready(function(){
	setInterval(function () {
        $('#raindrops').fadeIn(50).delay(50).fadeOut().delay(50).fadeIn(100);
    }, 5000);
	console.log("animation.js")
});