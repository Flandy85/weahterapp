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
            console.log(data);
            
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
    let icon = weatherNow[0].parameters[18].values[0];
    
    switch(icon) {
    case 1:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/sun-b.png" />')
        break;
    case 2:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/slightly-cloudy-b.png" />')
        break;
    case 3:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/slightly-cloudy-b.png" />')
        break;
    case 4:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/slightly-cloudy-b.png" />')
        break;
    case 5:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/slightly-cloudy-b.png" />')
        break;
    case 6:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/slightly-cloudy-b.pngg" />')
        break;
    case 7:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/fog-b.png" />')
        break;
    case 8:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/rain-b.png" />')
        break;
     case 9:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/thunder-b.png" />')
        break;
    case 10:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/snow-b.png" />')
        break;
    case 11:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/snow-b.png" />')
        break;
    case 12:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/rain-b.png" />')
        break;
    case 13:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/thunder-b.png" />')
        break;
    case 14:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/snow-b.png" />')
        break;
    case 15:
        $('#theDiv').prepend('<img id="theImg" src="images/icons/snow-b.png" />')
        break;
    
    default:
        console.log("Defauuuult");
}
    
    return $('#temp-now').html(' ' + Math.round(weatherNow[0].parameters[1].values[0]) + '°') +
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