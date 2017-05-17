// Run function only when page is done loading
$(document).ready(function(){

    // Click to run search function
    $('#search-btn').click(function (string) {

        // To get the value of the input field
        // and turn it to a variable that can be
        // used for the search.
        let citySearch = $('#city-name').val();
        theWeather(citySearch);
    });

    // Press enter to run search function
    $('#city-name').keypress(function (e) {
        let citySearch = $('#city-name').val();
        let key = e.which;
        if(key == 13)  // the enter key code
        {
            theWeather(citySearch);  
        }
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

                if(data.name.toLowerCase() == city.toLowerCase()) {
                    let widget = showTheWeather(data);
                    handleButtonClick(city);
                    $('#weather-info').html(widget);
                } else {
                    $('#weather-info').html('Tyvärr kunde inga resultat hittas för: ' + city);
                }


                $('#city-name').val('');
                $('#error').html('');
            }
        });
    } else {
        // Error message if you haven't filled in a city
        $('#error').html('You have to type in a City!');
    }
}
// function displaying response data from openweather api.
function showTheWeather(data) {
    return '<h2 style="color: white; text-shadow: black 0.1em 0.1em 0.2em">Current weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Weather:</strong> ' + data.weather[0].main + '</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Description:</strong> ' + data.weather[0].description + '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">' + '</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Temp:</strong> ' + data.main.temp + ' &deg;C</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Pressure:</strong> ' + data.main.pressure + ' hPa</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Humidity:</strong> ' + data.main.humidity + ' %</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Min. Temperature:</strong> ' + data.main.temp_min + ' &deg;C</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Max. Temperature:</strong> ' + data.main.temp_max + ' &deg;C</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Wind speed:</strong> ' + data.wind.speed + ' m/s</h3>' +
           '<h3 style="color: white; text-shadow: black 0.1em 0.1em 0.2em"><strong>Wind direction:</strong> ' + data.wind.deg + '&deg;</h3>';
}
