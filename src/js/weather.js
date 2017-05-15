// Run function only when page is done loading
$(document).ready(function(){

    // Click to run search function
    $('#search-btn').click(function () {

        // To get the value of the input field
        // and turn it to a variable that can be
        // used for the search.
        let citySearch = $('#city-name').val();
        theWeather(citySearch);
        handleButtonClick(citySearch);
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
