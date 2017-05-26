$(document).ready(function(){
	console.log('testing animation.js');
	setInterval(function () {
        $('#raindrops').fadeIn(50).delay(50).fadeOut().delay(50).fadeIn(100);
    }, 5000);
});