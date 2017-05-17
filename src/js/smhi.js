$(document).ready(function() {
    // Check if browser supports geolocation.
    function testLocation() {
        if (navigator.geolocation) {
            // If browser supports geolocation, get the location
            // and run the userPosition function.
            navigator.geolocation.getCurrentPosition(testPosition);
            console.log('Yay!');
        } else {
            // Error message if the browser doesn't support geolocation.
            console.log('Geolocation is not supported by this browser!');
        }
    }
    // Run the get location function.
    testLocation();
});

// When latitude and longitude is retrieved
// run the currentCity function, else
// print error message.

function testPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let latString = lat.toString();
    let longString = long.toString();

    let latSlice = latString.slice(0, 9);
    let longSlice = longString.slice(0, 9);

    console.log(latSlice);
    console.log(longSlice);

    if(latSlice != '' && longSlice != '') {
        testWeather(latSlice, longSlice);
    } else {
        console.log('Could not load position!');
    }
}

function testWeather(latSlice, longSlice) {
    // If the isn't empty run the seearch / ajax request

    // Ajax request to Open Weather Map
    $.ajax({
        url: 'https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/' + longSlice + '/lat/' + latSlice + '/data.json',
        type: 'GET',
        datsType: 'jsonp',
        success: function(data) {

                let widget = smhiWeather(data);

        }
    });
}


function smhiWeather(data) {

    return console.log(data), console.log(data.timeSeries.length);
}