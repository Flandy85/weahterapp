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
    console.log(weatherNow);
    console.log(forecast);

    // Visar vilken plats i arrayen objektet har som innehåller
    // datan med vädret för den aktuella timmen. Tänkte att man
    // på något vis med hjälp av det kan försöka välja ut objekten
    // som kommer efter utan att behöva veta vad dom heter för att
    // skriva ut vädret för dom nästkommande timmarna. Har dock inte
    // kommit längre än såhär just nu.
    console.log(data.timeSeries.indexOf(weatherNow[0]));

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
            plusNine = forecastIndex + 9, plusTen = forecastIndex + 10;

        return $('#weather-forecast').html(
                '<div class="forecast-item"><div class="forecast-time">Tid</div><div>Temperatur</div><div>Väder</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusOne].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusOne].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusOne].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusTwo].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusTwo].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusTwo].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusThree].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusThree].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusThree].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusFour].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusFour].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusFour].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusFive].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusFive].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusFive].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusSix].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusSix].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusSix].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusSeven].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusSeven].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusSeven].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusEight].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusEight].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusEight].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusNine].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusNine].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusNine].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div class="forecast-time">' + weather[plusTen].validTime.slice(11, 16) + '</div><div class="forecast-temp">' + Math.round(weather[plusTen].parameters[1].values[0]) + '°</div><div class="forecast-weather">' + weather[plusTen].parameters[18].values[0] + '</div></div>');
    }

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
            default: console.log("Defauuuult");
        }
    } else {
        // Day
        switch(icon) {
            case 1: $('#theDiv').html('<img id="theImg" src="images/weathericons/sun-b.png"/><h3 id="theWeather">Klart</h3>'); break;
            case 2: $('#theDiv').html('<img id="theImg" src="images/weathericons/nearly-clear-sky-b.png"/><h3 id="theWeather">Mest klart</h3>'); break;
            case 3: $('#theDiv').html('<img id="theImg" src="images/weathericons/cloud-b.png"/><h3 id="theWeather">Växlande molnighet</h3>'); break;
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
            default: console.log("Defauuuult");
        }
    }
   
    return  $('#temp-now').html(' ' + Math.round(weatherNow[0].parameters[1].values[0]) + '°') +
            $('#weather-wind').html('Vindhastighet: ' + weatherNow[0].parameters[11].values[0] + " " + weatherNow[0].parameters[11].unit ) +
            $('#weather-pressure').html('Lufttryck: ' + weatherNow[0].parameters[0].values[0] + " " + weatherNow[0].parameters[0].unit) +
            $('#symbol').html('Symbol: ' + weatherNow[0].parameters[18].values[0]);
       
}

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
}
// function adding black border around text
function smhiShow() {
    return '<h2 style="color: white; text-shadow: black 0.1em 0.1em 0.2em">ssss ' + data + '</h2>' 
    
}