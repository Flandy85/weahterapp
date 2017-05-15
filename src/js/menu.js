$('#open-menu').click(function() {
    openMenu();
});

$('#close-menu').click(function() {
    closeMenu();
});

function openMenu() {

    $('#open-menu').hide();
    $('#close-menu').show();
    $('#top-menu').show();
    
}

function closeMenu() {

    $('#close-menu').hide();
    $('#open-menu').show();
    $('#top-menu').hide();

}