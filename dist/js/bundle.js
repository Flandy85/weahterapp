//$("button").on("click", handleButtonClick);

function jsonFlickrFeed(json) {
  //console.log(json);
  
    var flickr = json.items;
   console.log(flickr[0].media);
   $("<img />").attr("src", flickr[0].media.m).appendTo("#images"); 
    
//  $.each(json.items, function(i, item) {
//    $("<img />").attr("src", item.media.m).appendTo("#images"); 
//  });
};

function handleButtonClick() {
    
    var bla = $('#txt_name').val();
    
    
//  $("button").remove();
  
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": bla, "format": "json" }
  });
}


/*
index.html tagsen...
   <button id="button">I Love cats!</button>
   <input type="text" id="txt_name"/>

<div id="images"></div>
*/
$(document).ready(function() {
    // Check if browser supports geolocation.
    function getLocation() {
        if (navigator.geolocation) {
            // If browser supports geolocation, get the location
            // and run the userPosition function.
            navigator.geolocation.getCurrentPosition(userPosition);
            console.log('Yay!');
        } else {
            // Error message if the browser doesn't support geolocation.
            console.log('Geolocation is not supported by this browser!');
        }
    }
    // Run the get location function.
    getLocation();
});

// When latitude and longitude is retrieved
// run the currentCity function, else
// print error message.
function userPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    if(lat != '' && long != '') {
        currentCity(lat, long);
    } else {
        console.log('Could not load position!');
    }
}

// Ajax call to google API wich retrieves the current
// city based on the coordinates.
function currentCity (lat, long) {
    $.ajax({

        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyBMXeJ760fwv3AyO4sAVZpZjcCjoYPuTvs',
        type: 'GET',
        datsType: 'jsonp',
        success: function(data) {
            let widget = getTheCity(data);
            // Runs the theWeather function with the widget as a parameter.
            theWeather(widget);
        }

    });
}

// Retrieves the current city from the JSON object and
// return it to the widget variable.
function getTheCity (data) {
    return data.results[0].address_components[4].long_name;
}

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
// Run function only when page is done loading
$(document).ready(function(){

    // Click to run search function
    $('#search-btn').click(function () {

        // To get the value of the input field
        // and turn it to a variable that can be
        // used for the search.
        let citySearch = $('#city-name').val();
        theWeather(citySearch);
    });

});

// Weather search function
function theWeather(city) {

    // If the isn't empty run the seearch / ajax request
    if(city != '') {

        // Ajax request to Open Weather Map
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&APPID=afd14917ee4d88301eb1c859a24135f3',
            type: 'GET',
            datsType: 'jsonp',
            success: function(data) {
                let widget = showTheWeather(data);

                $('#weather-info').html(widget);

                $('#city-name').val('');
                $('#error').html('');
            }
        });
    } else {
        // Error message if you haven't filled in a city
        $('#error').html('You have to type in a City!');
    }
}

function showTheWeather(data) {
    return '<h2>Current weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
           '<h3><strong>Weather:</strong> ' + data.weather[0].main + '</h3>' +
           '<h3><strong>Description: <img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"></strong> ' + data.weather[0].description + '</h3>' +
           '<h3><strong>Temp:</strong> ' + data.main.temp + ' &deg;C</h3>' +
           '<h3><strong>Pressure:</strong> ' + data.main.pressure + ' hPa</h3>' +
           '<h3><strong>Humidity:</strong> ' + data.main.humidity + ' %</h3>' +
           '<h3><strong>Min. Temperature:</strong> ' + data.main.temp_min + ' &deg;C</h3>' +
           '<h3><strong>Max. Temperature:</strong> ' + data.main.temp_max + ' &deg;C</h3>' +
           '<h3><strong>Wind speed:</strong> ' + data.wind.speed + ' m/s</h3>' +
           '<h3><strong>Wind direction:</strong> ' + data.wind.deg + '&deg;</h3>';
}
