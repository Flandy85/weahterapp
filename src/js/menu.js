// Call the open menu function
$('#open-menu').click(function() {
    openMenu();
});

// Call the close menu function
$('#close-menu').click(function() {
    closeMenu();
});

// Open menu
function openMenu() {
    $('#open-menu').hide();
    $('#close-menu').show();
    $('#top-menu').show();
    $('.top-bar').css('background-color', 'rgba(255,255,255, 0.9)'); 
}

// Close menu
function closeMenu() {
    $('#close-menu').hide();
    $('#open-menu').show();
    $('#top-menu').hide();
    $('.top-bar').css('background-color', '');
}