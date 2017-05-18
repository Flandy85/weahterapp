// Run function only when page is done loading
$(document).ready(function(){

    // Click to run search function
    $('#search-btn').click(function (string) {
      // selected_size = 800; --------> // KANSKE ÄR KOD SOM SKA ANVÄNDAS FÖR ATT FÅ UT STÖRRE BILDER FRÅN FLICKR, OKLART I DAGSLÄGET!
        // To get the value of the input field
        // and turn it to a variable that can be
        // used for the search.
        let citySearch = $('#city-name').val();
        cityConverter(citySearch);
    });

    // Press enter to run search function
    $('#city-name').keypress(function (e) {
        let citySearch = $('#city-name').val();
        let key = e.which;
        if(key == 13)  // the enter key code
        {
            cityConverter(citySearch);  
        }
    }); 
});

