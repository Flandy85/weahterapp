
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
            day = "Mondag";
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
function jsonFlickrFeed(json) {
  //console.log(json);
  
    const flickr = json.items;
   //console.log(flickr[0].media);
   // $("#images").html('<img src="' + flickr[0].media.m + '">');
   $('body').css({"background": "url(" + flickr[0].media.m + ")",
    "background-size": "cover",
    "background-repeat": "no-repeat"


    });
};
// function that activates ajax call to flickr api when searchbutton i clicked.


// KANSKE ÄR KOD SOM SKA ANVÄNDAS FÖR ATT FÅ UT STÖRRE BILDER FRÅN FLICKR, OKLART I DAGSLÄGET!
// var apiurl,myresult,apiurl_size,selected_size;  
// apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cbbd48e2830e6787ff24a776d11985ba&per_page=5&format=json&nojsoncallback=1";
// console.log(apiurl);
function handleButtonClick(city) {
    
    // var bla = $('.txt_name').val();
  
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    // url: 'https://api.flickr.com/services/feeds/?method=flickr.photos.getSizes&api_key=cbbd48e2830e6787ff24a776d11985ba&per_page=5&format=json&nojsoncallbak=1',
    dataType: 'jsonp',
    data: { "tags": city, "format": "json" }
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
            $('#city').html(widget);     
        }

    });
}

// Retrieves the current city from the JSON object and
// return it to the widget variable.
function getTheCity (data) {
    return data.results[0].address_components[4].long_name;
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
$(document).ready(function() {
    // Check if browser supports geolocation.
    function testLocation() {
        if (navigator.geolocation) {
            // If browser supports geolocation, get the location
            // and run the userPosition function.
            navigator.geolocation.getCurrentPosition(testPosition);
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
    let lat = position.coords.latitude,
        long = position.coords.longitude;

    let latString = lat.toString(),
        longString = long.toString();

    let latSlice = latString.slice(0, 9),
        longSlice = longString.slice(0, 9);

    if(latSlice != '' && longSlice != '') {
        testWeather(latSlice, longSlice);
    } else {
        console.log('Could not load position!');
    }
}

// Function for retrieving weather data from SMHI
function testWeather(latSlice, longSlice) {
    // Ajax request to SMHI
    $.ajax({
        url: 'https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/' + longSlice + '/lat/' + latSlice + '/data.json',
        type: 'GET',
        datsType: 'jsonp',
        success: function(data) {
            let widget = smhiWeather(data);
        }
    });
}

// Function for selecting only the needed
// weather information.
function smhiWeather(data, thisYear) {

    let year = fullDate(thisYear);
    let weatherNow = getObjects(data.timeSeries, 'validTime', year);

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
    return $('#temp-now').html(' ' + Math.round(weatherNow[0].parameters[1].values[0]) + '°');
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
// Run function only when page is done loading
$(document).ready(function(){

    // Click to run search function
    $('#search-btn').click(function (string) {
      // selected_size = 800; //--------> // KANSKE ÄR KOD SOM SKA ANVÄNDAS FÖR ATT FÅ UT STÖRRE BILDER FRÅN FLICKR, OKLART I DAGSLÄGET!
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
    // If city isn't empty run the seearch / ajax request
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
