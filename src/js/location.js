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