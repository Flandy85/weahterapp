// Run function only when page is done loading
$(document).ready(function(){
    // Click to run search function
    $('#search-btn').click(callback);
    // Press enter to run search function
    $("#city-name").keypress(function() {
        if (event.which === 13) callback();
    });      
}); 

// Variable with function which activates on click or keydown event.
let callback = function() {
    // used for the search.
    let pageLoader = false;
    loader(pageLoader);
    // function, Close dropdown menu after click or keydown enter
    closeMenu();
}

function errorMessage(error) {
    	
    $('<div class="error-container"><p class="error">' + error + '</p></div>').insertAfter( "#top-menu" );
    $('#temp-now').html('');
    $('body').css( "background", "" );
    setTimeout(function(errorMessage) {
        $('.error-container').remove();
    }, 7000);
}