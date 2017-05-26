$(document).ready(function(){
	console.log('testing animation.js');
	setInterval(function () {
        $('#raindrops').fadeIn(50).delay(50).fadeOut().delay(50).fadeIn(100);
    }, 5000);
});

function dayDateMonth(weekDay, monthDay, thisMonth) {
    // Retrieves the day of the week from the function theDay
    let day = theDay(weekDay);
    let date = theDate(monthDay);
    let month = theMonth(thisMonth);

    $('#date').html(day + ' ' + month + '/' + date);

    // Update every 10 seconds
    let updateDate = setTimeout(dayDateMonth, 10000);
}

// Returns the day of the week to the variable day
function theDay(weekDay) {
    let day;
    switch (new Date().getDay()) {
        case 0:
            day = "Söndag";
            break;
        case 1:
            day = "Måndag";
            break;
        case 2:
            day = "Tisdag";
            break;
        case 3:
            day = "Onsdag";
            break;
        case 4:
            day = "Torsdag";
            break;
        case 5:
            day = "Fredag";
            break;
        case  6:
            day = "Lördag";
    }
    return day;
}

// Returns the day of the month to the variable date
function theDate(monthDay) {
    let d = new Date();
    let date = d.getDate();
    return date;
}

// Returns the month to the variable month
function theMonth(thisMonth) {
    let m = new Date();
    let mm = m.getMonth();
    let month = mm + 1;

    if(month < 10) {
        month = '0' + month;
        return month;
    } else {
        return month;
    }
}

dayDateMonth();
// Function jsonFlickrFeed is activated when user use searchfunction in weather.js
//function jsonFlickrFeed(json) {
//  //console.log(json);
//  
//    const flickr = json.items;
//   //console.log(flickr[0].media);
//   // $("#images").html('<img src="' + flickr[0].media.m + '">');
//   $('body').css({"background": "url(" +data.photos.photo[0].url_l + ")",
//    "background-size": "cover",
//    "background-repeat": "no-repeat"
//
//
//    });
//};
// function that activates ajax call to flickr api when searchbutton i clicked.


// KANSKE ÄR KOD SOM SKA ANVÄNDAS FÖR ATT FÅ UT STÖRRE BILDER FRÅN FLICKR, OKLART I DAGSLÄGET!
// var apiurl,myresult,apiurl_size,selected_size;  

function flickrImg(city) {
    
    // var bla = $('.txt_name').val();
    $.ajax('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd19ed51d6cdbcda479e49d09494285a&tags=' + city + '&extras=url_l&per_page=1&page=1&format=json', { dataType: 'jsonp', jsonp: 'jsoncallback' })
    .then(function(data, status, xhr) {
        //console.log(data);
        $('body').css({"background": "url(" + data.photos.photo[0].url_l + ")",
    "background-size": "cover",
    "background-repeat": "no-repeat"});
       // console.log('success (promises): ' + data[0]);
}, function(xhr, status, error) {
    console.log('failed (promises): ' + error);
});




// KANSKE ÄR KOD SOM SKA ANVÄNDAS FÖR ATT FÅ UT STÖRRE BILDER FRÅN FLICKR, OKLART I DAGSLÄGET!
  // $('#search-btn').click(function(){  
    // $.getJSON(apiurl,function(json){  
    //   $.each(json.photos.photo,function(i,myresult){  
    //     apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=cbbd48e2830e6787ff24a776d11985ba&photo_id="+myresult.id+"&format=json&nojsoncallback=1";  
    //     $.getJSON(apiurl_size,function(size){  
    //       $.each(size.sizes.size,function(i,myresult_size){  
    //         if(myresult_size.width==selected_size){  
    //           $("body").append('<p><a href="'+myresult_size.url+'" target="_blank"><img src="'+myresult_size.source+'"/></a></p>');

    //           console.log(myresult_size.url + myresult_size.source); 
    //         }  
    //       })  
    //     })  
    //   });  
    // });  
  // }); 


}

$(document).ready(function() {
    let pageLoader = true;
    loader(pageLoader);
});

// Check if browser supports geolocation.
function getLocation() {
        if (navigator.geolocation) {
            // If browser supports geolocation, get the location
            // and run the userPosition function.
            navigator.geolocation.getCurrentPosition(userPosition);
        } else {
            // Error message if the browser doesn't support geolocation.
            let error = 'Den här webbläsaren stödjer inte geolocation!';
            errorMessage(error);
        }
    }

// When latitude and longitude is retrieved
// run the currentCity function, else
// print error message.
function userPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    if(lat != '' && long != '') {
        currentCity(lat, long);
    } else {
        let error = 'Kunde inte ladda din position!';
        errorMessage(error);
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
            let city = getTheCity(data);
            // Runs the cityConverter function with the city as a parameter.
            cityConverter(city);
            flickrImg(city); 
        }
    });
}

// Retrieves the current city from the JSON object and
// return it to the widget variable.
function getTheCity (data) {
    return data.results[0].address_components[4].long_name;
}

function cityConverter(city) {
    $('.error').html('');
    $.ajax({

        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyDpZWJC15Lusfe5_B1TLoYEHzZVtZLSPVw',
        type: 'GET',
        datsType: 'jsonp',
        success: function(data) {

            let googleCity = data.results[0].address_components[0].long_name;

            if(googleCity.toLowerCase() == city.toLowerCase()) {
                convertCity();
                flickrImg(googleCity);
                $('#city').html(googleCity);
            } else {
                $('#city').html('');
                let error = 'Inga resultat hittades för: ' + city;
                errorMessage(error);
            }

            function convertCity() {
                let lat = data.results[0].geometry.location.lat,
                    long = data.results[0].geometry.location.lng;

                let latString = lat.toString(),
                    longString = long.toString();

                let latSlice = latString.slice(0, 9),
                    longSlice = longString.slice(0, 9);

                if(latSlice != '' && longSlice != '') {
                    theWeather(latSlice, longSlice);
                } else {
                    let error = 'Kunde inte ladda din position!';
                    errorMessage(error);
                }
            }
        }

    });
}

function loader(pageLoader) {

    $('#theDiv').html('<img class="loader" src="images/icons/loading_icon.png"/><h3 class="loader-text">Laddar</h3>');
    if(pageLoader) {
        setTimeout(function(){
            // Run the get location function.
            getLocation();
        }, 500);
    } else {
        setTimeout(function(){
            let citySearch = $('#city-name').val();
            cityConverter(citySearch);
        }, 500);
    }
}
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

// Clock function
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    $('#time').html(h + ':' + m);
    var t = setTimeout(startTime, 500);
}
// Add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}
// Start clock
startTime();

// Call the open menu function
$('#show-forecast').click(function() {
    showForecast();
});

// Call the close menu function
$('#hide-forecast').click(function() {
    hideForecast();
});

// Open menu
function showForecast() {
    $('#show-forecast').hide();
    $('#hide-forecast').show();
    $('#weather-forecast').show();
}

// Close menu
function hideForecast() {
    $('#hide-forecast').hide();
    $('#show-forecast').show();
    $('#weather-forecast').hide();
}
// Run function only when page is done loading
$(document).ready(function(){
    // Click to run search function
    $('#search-btn').click(callback);
    // Press enter to run search function
    $('#city-name').keypress(function() {
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
                '<div class="forecast-item"><div>' + weather[plusOne].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusOne].parameters[1].values[0]) + '°</div><div>' + weather[plusOne].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusTwo].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusTwo].parameters[1].values[0]) + '°</div><div>' + weather[plusTwo].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusThree].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusThree].parameters[1].values[0]) + '°</div><div>' + weather[plusThree].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusFour].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusFour].parameters[1].values[0]) + '°</div><div>' + weather[plusFour].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusFive].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusFive].parameters[1].values[0]) + '°</div><div>' + weather[plusFive].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusSix].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusSix].parameters[1].values[0]) + '°</div><div>' + weather[plusSix].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusSeven].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusSeven].parameters[1].values[0]) + '°</div><div>' + weather[plusSeven].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusEight].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusEight].parameters[1].values[0]) + '°</div><div>' + weather[plusEight].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusNine].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusNine].parameters[1].values[0]) + '°</div><div>' + weather[plusNine].parameters[18].values[0] + '</div></div>' +
                '<div class="forecast-item"><div>' + weather[plusTen].validTime.slice(11, 16) + '</div><div>' + Math.round(weather[plusTen].parameters[1].values[0]) + '°</div><div>' + weather[plusTen].parameters[18].values[0] + '</div></div>');
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

function smhiShow() {
    return '<h2 style="color: white; text-shadow: black 0.1em 0.1em 0.2em">ssss ' + data + '</h2>' 
    
}