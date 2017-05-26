// Function for retrieving weather data from SMHI
function theWeather(latSlice, longSlice) {
    // Ajax request to SMHI
    $.ajax({
        url: 'https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/' + longSlice + '/lat/' + latSlice + '/data.json',
        type: 'GET',
        datsType: 'jsonp',
        success: function(data) {
            let widget = smhiWeather(data);
            console.log(data);
        }
    });
}

// Function for selecting only the needed
// weather information.
function smhiWeather(data, thisYear, forecasting) {

    let year = fullDate(thisYear),
        weatherNow = getObjects(data.timeSeries, 'validTime', year),
        forecastIndex = data.timeSeries.indexOf(weatherNow[0]),
        forecast = hourlyForecast(forecasting);

    // Function for finding the object contaning the
    // weather information for current hour and return
    // it to the variable weatherNow.
    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    }

    function hourlyForecast(forecasting) {

        let weather = data.timeSeries, plusOne = forecastIndex + 1, plusTwo = forecastIndex + 2,
            plusThree = forecastIndex + 3, plusFour = forecastIndex + 4, plusFive = forecastIndex + 5,
            plusSix = forecastIndex + 6, plusSeven = forecastIndex + 7, plusEight = forecastIndex + 8,
            plusNine = forecastIndex + 9, plusTen = forecastIndex + 10, weatherLoop, forecastWeather = 0,
            hr = (new Date()).getHours();

            for (i = forecastIndex; i < forecastIndex + 10 || forecastIndex == 10 ; i++) { 

                weatherLoop = weather[i].parameters[18].values[0];
                forecastWeather++;

                if(hr == 0 || hr == 1 || hr == 2 || hr == 3 || hr == 4 || hr == 22 || hr == 23) {
                    // Day
                    switch(weatherLoop) {
                        case 1: weatherLoop = '<div>Klart</div><img class="forecast-icon" src="images/weathericons/sun-b.png"/>'; break;
                        case 2: weatherLoop = '<div>Mest klart</div><img class="forecast-icon" src="images/weathericons/nearly-clear-sky-b.png"/>'; break;
                        case 3: weatherLoop = '<div>Växlande molnighet</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>'; break;
                        case 4: weatherLoop = '<div>Halvklart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-b.png"/>'; break;
                        case 5: weatherLoop = '<div>Målnigt</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>'; break;
                        case 6: weatherLoop = '<div>Mulet</div><img class="forecast-icon" src="images/weathericons/overcast-b.png"/>'; break;
                        case 7: weatherLoop = '<div>Dimma</div><img class="forecast-icon" src="images/weathericons/fog-b.png"/>'; break;
                        case 8: weatherLoop = '<div>Regnskurar</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>'; break;
                        case 9: weatherLoop = '<div>Åskskurar</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>'; break;
                        case 10: weatherLoop = '<div>Byar av snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 11: weatherLoop = '<div>Snöbyar</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 12: weatherLoop = '<div>Regn</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>'; break;
                        case 13: weatherLoop = '<div>Åska</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>'; break;
                        case 14: weatherLoop = '<div>Snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 15: weatherLoop = '<div>Snöfall</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                    } // End switch statement day
                } else {
                    // Night
                    switch(weatherLoop) {
                        case 1: weatherLoop = '<div>Klart</div><img class="forecast-icon" src="images/weathericons/moon-b.png"/>'; break;
                        case 2: weatherLoop = '<div>Mest klart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>'; break;
                        case 3: weatherLoop = '<div>Växlande molnighet</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>'; break;
                        case 4: weatherLoop = '<div>Halvklart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>'; break;
                        case 5: weatherLoop = '<div>Målnigt</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>'; break;
                        case 6: weatherLoop = '<div>Mulet</div><img class="forecast-icon" src="images/weathericons/overcast-b.png"/>'; break;
                        case 7: weatherLoop = '<div>Dimma</div><img class="forecast-icon" src="images/weathericons/fog-b.png"/>'; break;
                        case 8: weatherLoop = '<div>Regnskurar</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>'; break;
                        case 9: weatherLoop = '<div>Åskskurar</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>'; break;
                        case 10: weatherLoop = '<div>Byar av snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 11: weatherLoop = '<div>Snöbyar</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 12: weatherLoop = '<div>Regn</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>'; break;
                        case 13: weatherLoop = '<div>Åska</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>'; break;
                        case 14: weatherLoop = '<div>Snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                        case 15: weatherLoop = '<div>Snöfall</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'; break;
                    } // End switch statement night
                } // End else
                $('.forecast-weather-' + forecastWeather).html(weatherLoop);
            } // End for loop
        return  $('.forecast-time-1').html(weather[plusOne].validTime.slice(11, 16)) + $('.forecast-temp-1').html(Math.round(weather[plusOne].parameters[1].values[0]) + '°') +
                $('.forecast-time-2').html(weather[plusTwo].validTime.slice(11, 16)) + $('.forecast-temp-2').html(Math.round(weather[plusTwo].parameters[1].values[0]) + '°') +
                $('.forecast-time-3').html(weather[plusThree].validTime.slice(11, 16)) + $('.forecast-temp-3').html(Math.round(weather[plusThree].parameters[1].values[0]) + '°') +
                $('.forecast-time-4').html(weather[plusFour].validTime.slice(11, 16)) + $('.forecast-temp-4').html(Math.round(weather[plusFour].parameters[1].values[0]) + '°') +
                $('.forecast-time-5').html(weather[plusFive].validTime.slice(11, 16)) + $('.forecast-temp-5').html(Math.round(weather[plusFive].parameters[1].values[0]) + '°') +
                $('.forecast-time-6').html(weather[plusSix].validTime.slice(11, 16)) + $('.forecast-temp-6').html(Math.round(weather[plusSix].parameters[1].values[0]) + '°') +
                $('.forecast-time-7').html(weather[plusSeven].validTime.slice(11, 16)) + $('.forecast-temp-7').html(Math.round(weather[plusSeven].parameters[1].values[0]) + '°') +
                $('.forecast-time-8').html(weather[plusEight].validTime.slice(11, 16)) + $('.forecast-temp-8').html(Math.round(weather[plusEight].parameters[1].values[0]) + '°') +
                $('.forecast-time-9').html(weather[plusNine].validTime.slice(11, 16)) + $('.forecast-temp-9').html(Math.round(weather[plusNine].parameters[1].values[0]) + '°') +
                $('.forecast-time-10').html(weather[plusTen].validTime.slice(11, 16)) + $('.forecast-temp-10').html(Math.round(weather[plusTen].parameters[1].values[0]) + '°');
    } // End hourlyForecast

    let icon = weatherNow[0].parameters[18].values[0];
    let hr = (new Date()).getHours();

    // If it's night it displays different icons in the switch statement
    if(hr == 0 || hr == 1 || hr == 2 || hr == 3 || hr == 4 || hr == 22 || hr == 23) {
        // Night
        switch(icon) {
            case 1: $('#theDiv').html('<img id="theImg" src="images/weathericons/moon-b.png"/><h3 id="theWeather">Klart</h3>'); break;
            case 2: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Mest klart</h3>'); break;
            case 3: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Växlande molnighet</h3>'); break;
            case 4: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Halvklart</h3>'); break;
            case 5: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Målnigt</h3>'); break;
            case 6: $('#theDiv').html('<img id="theImg" src="images/weathericons/overcast-b.png"/><h3 id="theWeather">Mulet</h3>'); break;
            case 7: $('#theDiv').html('<img id="theImg" src="images/weathericons/fog-b.png"/><h3 id="theWeather">Dimma</h3>'); break;
            case 8: $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regnskurar</h3>'); break;
            case 9: $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åskskurar</h3>'); break;
            case 10: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Byar av snöblandat regn</h3>'); break;
            case 11: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöbyar</h3>'); break;
            case 12: $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regn</h3>'); break;
            case 13: $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åska</h3>'); break;
            case 14: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöblandat regn</h3>'); break;
            case 15: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöfall</h3>'); break;
        } // End night
    } else {
        // Day
        switch(icon) {
            case 1: $('#theDiv').html('<img id="theImg" src="images/weathericons/sun-b.png"/><h3 id="theWeather">Klart</h3>'); break;
            case 2: $('#theDiv').html('<img id="theImg" src="images/weathericons/nearly-clear-sky-b.png"/><h3 id="theWeather">Mest klart</h3>'); break;
            case 3: $('#theDiv').html('<object id="theImg" type="image/svg+xml" data="images/weathericons/overcast-b.svg"></object><h3 id="theWeather">Växlande molnighet</h3>'); break;
            case 4: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Halvklart</h3>'); break;
            case 5: $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Målnigt</h3>'); break;
            case 6: $('#theDiv').html('<img id="theImg" src="images/weathericons/overcast-b.png"/><h3 id="theWeather">Mulet</h3>'); break;
            case 7: $('#theDiv').html('<img id="theImg" src="images/weathericons/fog-b.png"/><h3 id="theWeather">Dimma</h3>'); break;
            case 8: $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regnskurar</h3>'); break;
            case 9: $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åskskurar</h3>'); break;
            case 10: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Byar av snöblandat regn</h3>'); break;
            case 11: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöbyar</h3>'); break;
            case 12: $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regn</h3>'); break;
            case 13: $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åska</h3>'); break;
            case 14: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöblandat regn</h3>'); break;
            case 15: $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöfall</h3>'); break;
        } //End day
    } // End else
   
    return  $('#temp-now').html(' ' + Math.round(weatherNow[0].parameters[1].values[0]) + '°') +
            $('#weather-wind').html('Vindhastighet: ' + weatherNow[0].parameters[11].values[0] + " " + weatherNow[0].parameters[11].unit ) +
            $('#weather-pressure').html('Lufttryck: ' + weatherNow[0].parameters[0].values[0] + " " + weatherNow[0].parameters[0].unit) +
            $('#symbol').html('Symbol: ' + weatherNow[0].parameters[18].values[0]);
       
} // End smhiWeather

// Function for calculating the parameters
// needed for the getObjects function.
function fullDate(thisYear) {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        time = date.getHours();

    month = month + 1;
    if(month < 10) {
        month = '0' + month;
    }
    if(day < 10) {
        day = '0' + day;
    }
    if(time < 10) {
        time = '0' + time;
    }
    return year + '-' + month + '-' + day + 'T' + time + ':00:00Z';
} // End fullDate

// function adding black border around tex
function smhiShow() {
    return '<h2 style="color: white; text-shadow: black 0.1em 0.1em 0.2em">ssss ' + data + '</h2>' 
    
} // End smhiShow