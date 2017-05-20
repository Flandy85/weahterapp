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
    console.log(icon);
    // let iconStyles = $('#theImg').css({"widht": "250px;", "height": "250px;"});
    switch(icon) {
        case 1:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/sun-b.png"/>')
            break;
        case 2:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/>')
            break;
        case 3:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/cloud-b.png"/>')
            break;
        case 4:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/>')
            break;
        case 5:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/>')
            break;
        case 6:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/>')
            break;
        case 7:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/fog-b.png"/>')
            break;
        case 8:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/>')
            break;
        case 9:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/>')
            break;
        case 10:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/>')
            break;
        case 11:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/>')
            break;
        case 12:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/rain-b.png"/>')
            break;
        case 13:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/thunder-b.png"/>')
            break;
        case 14:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/>')
            break;
        case 15:
            $('#theDiv').html('<img id="theImg" src="images/weathericons/snow-b.png"/>')
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