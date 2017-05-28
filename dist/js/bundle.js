"use strict";function dayDateMonth(e,a,t){
// Retrieves the day of the week from the function theDay
var s=theDay(e),i=theDate(a),r=theMonth(t);$("#date").html(s+" "+r+"/"+i);
// Update every 10 seconds
setTimeout(dayDateMonth,1e4)}
// Returns the day of the week to the variable day
function theDay(e){var a=void 0;switch((new Date).getDay()){case 0:a="Söndag";break;case 1:a="Måndag";break;case 2:a="Tisdag";break;case 3:a="Onsdag";break;case 4:a="Torsdag";break;case 5:a="Fredag";break;case 6:a="Lördag"}return a}
// Returns the day of the month to the variable date
function theDate(e){return(new Date).getDate()}
// Returns the month to the variable month
function theMonth(e){var a=new Date,t=a.getMonth(),s=t+1;return s<10?s="0"+s:s}function flickrImg(e){
// var bla = $('.txt_name').val();
$.ajax("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd19ed51d6cdbcda479e49d09494285a&tags="+e+"&extras=url_l&per_page=1&page=1&format=json",{dataType:"jsonp",jsonp:"jsoncallback"}).then(function(e,a,t){
//console.log(data);
$("body").css({background:"url("+e.photos.photo[0].url_l+")","background-size":"cover","background-repeat":"no-repeat"})},function(e,a,t){console.log("failed (promises): "+t)})}
// Check if browser supports geolocation.
function getLocation(){if(navigator.geolocation)
// If browser supports geolocation, get the location
// and run the userPosition function.
navigator.geolocation.getCurrentPosition(userPosition);else{errorMessage("Den här webbläsaren stödjer inte geolocation!")}}
// When latitude and longitude is retrieved
// run the currentCity function, else
// print error message.
function userPosition(e){var a=e.coords.latitude,t=e.coords.longitude;if(""!=a&&""!=t)currentCity(a,t);else{errorMessage("Kunde inte ladda din position!")}}
// Ajax call to google API wich retrieves the current
// city based on the coordinates.
function currentCity(e,a){$.ajax({url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+a+"&key=AIzaSyBMXeJ760fwv3AyO4sAVZpZjcCjoYPuTvs",type:"GET",datsType:"jsonp",success:function(e){var a=getTheCity(e);
// Runs the cityConverter function with the city as a parameter.
cityConverter(a),flickrImg(a)}})}
// Retrieves the current city from the JSON object and
// return it to the widget variable.
function getTheCity(e){return e.results[0].address_components[4].long_name}function cityConverter(e){$(".error").html(""),$.ajax({url:"https://maps.googleapis.com/maps/api/geocode/json?address="+e+"&key=AIzaSyDpZWJC15Lusfe5_B1TLoYEHzZVtZLSPVw",type:"GET",datsType:"jsonp",success:function(a){var t=a.results[0].address_components[0].long_name;if(t.toLowerCase()==e.toLowerCase())!function(){var e=a.results[0].geometry.location.lat,t=a.results[0].geometry.location.lng,s=e.toString(),i=t.toString(),r=s.slice(0,9),c=i.slice(0,9);""!=r&&""!=c?theWeather(r,c):errorMessage("Kunde inte ladda din position!")}(),flickrImg(t),$("#city").html(t);else{$("#city").html("");errorMessage("Inga resultat hittades för: "+e)}}})}
// Function giving feedback to user that page is loading
function loader(e){$("#theDiv").html('<img class="loader" src="images/icons/loading_icon.png"/><h3 class="loader-text">Laddar</h3>'),e?setTimeout(function(){
// Run the get location function.
getLocation()},500):setTimeout(function(){cityConverter($("#city-name").val())},500)}
// Open menu
function openMenu(){$("#open-menu").hide(),$("#close-menu").show(),$("#top-menu").show(),$(".top-bar").css("background-color","rgba(255,255,255, 0.9)")}
// Close menu
function closeMenu(){$("#close-menu").hide(),$("#open-menu").show(),$("#top-menu").hide(),$(".top-bar").css("background-color","")}
// Clock function
function startTime(){var e=new Date,a=e.getHours(),t=e.getMinutes();a=checkTime(a),t=checkTime(t),$("#time").html(a+":"+t);setTimeout(startTime,500)}
// Add zero in front of numbers < 10
function checkTime(e){return e<10&&(e="0"+e),e}
// Open menu
function showForecast(){$("#show-forecast").hide(),$("#hide-forecast").show(),$("#weather-forecast").show()}
// Close menu
function hideForecast(){$("#hide-forecast").hide(),$("#show-forecast").show(),$("#weather-forecast").hide()}function errorMessage(e){$('<div class="error-container"><p class="error">'+e+"</p></div>").insertAfter("#top-menu"),$("#temp-now").html(""),$("body").css("background",""),setTimeout(function(e){$(".error-container").remove()},7e3)}
// Function for retrieving weather data from SMHI
function theWeather(e,a){
// Ajax request to SMHI
$.ajax({url:"https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+a+"/lat/"+e+"/data.json",type:"GET",datsType:"jsonp",success:function(e){smhiWeather(e)}})}
// Function for selecting only the needed
// weather information.
function smhiWeather(e,a,t){
// Function for finding the object contaning the
// weather information for current hour and return
// it to the variable weatherNow.
function s(e,a,t){var i=[];for(var r in e)e.hasOwnProperty(r)&&("object"==_typeof(e[r])?i=i.concat(s(e[r],a,t)):r==a&&e[a]==t&&i.push(e));return i}var i=fullDate(a),r=s(e.timeSeries,"validTime",i),c=e.timeSeries.indexOf(r[0]),n=(function(a){for(var t=e.timeSeries,s=c+1,i=c+2,r=c+3,n=c+4,o=c+5,h=c+6,m=c+7,g=c+8,l=c+9,d=c+10,u=void 0,b=0,p=(new Date).getHours(),v=c;v<c+10||10==c;v++){if(u=t[v].parameters[18].values[0],b++,0==p||1==p||2==p||3==p||4==p||22==p||23==p)
// Night
switch(u){case 1:u='<div>Klart</div><img class="forecast-icon" src="images/weathericons/moon-b.png"/>';break;case 2:u='<div>Mest klart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>';break;case 3:u='<div>Växlande molnighet</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>';break;case 4:u='<div>Halvklart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-night-b.png"/>';break;case 5:u='<div>Målnigt</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>';break;case 6:u='<div>Mulet</div><img class="forecast-icon" src="images/weathericons/overcast-b.png"/>';break;case 7:u='<div>Dimma</div><img class="forecast-icon" src="images/weathericons/fog-b.png"/>';break;case 8:u='<div>Regnskurar</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>';break;case 9:u='<div>Åskskurar</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>';break;case 10:u='<div>Byar av snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 11:u='<div>Snöbyar</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 12:u='<div>Regn</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>';break;case 13:u='<div>Åska</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>';break;case 14:u='<div>Snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 15:u='<div>Snöfall</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'}else
// Day
switch(u){case 1:u='<div>Klart</div><img class="forecast-icon" src="images/weathericons/sun-b.png"/>';break;case 2:u='<div>Mest klart</div><img class="forecast-icon" src="images/weathericons/nearly-clear-sky-b.png"/>';break;case 3:u='<div>Växlande molnighet</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>';break;case 4:u='<div>Halvklart</div><img class="forecast-icon" src="images/weathericons/slightly-cloudy-b.png"/>';break;case 5:u='<div>Målnigt</div><img class="forecast-icon" src="images/weathericons/cloud-b.png"/>';break;case 6:u='<div>Mulet</div><img class="forecast-icon" src="images/weathericons/overcast-b.png"/>';break;case 7:u='<div>Dimma</div><img class="forecast-icon" src="images/weathericons/fog-b.png"/>';break;case 8:u='<div>Regnskurar</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>';break;case 9:u='<div>Åskskurar</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>';break;case 10:u='<div>Byar av snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 11:u='<div>Snöbyar</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 12:u='<div>Regn</div><img class="forecast-icon" src="images/weathericons/rain-b.png"/>';break;case 13:u='<div>Åska</div><img class="forecast-icon" src="images/weathericons/thunder-b.png"/>';break;case 14:u='<div>Snöblandat regn</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>';break;case 15:u='<div>Snöfall</div><img class="forecast-icon" src="images/weathericons/snow-b.png"/>'}// End else
$(".forecast-weather-"+b).html(u)}// End for loop
$(".forecast-time-1").html(t[s].validTime.slice(11,16)),$(".forecast-temp-1").html(Math.round(t[s].parameters[1].values[0])+"°"),$(".forecast-time-2").html(t[i].validTime.slice(11,16)),$(".forecast-temp-2").html(Math.round(t[i].parameters[1].values[0])+"°"),$(".forecast-time-3").html(t[r].validTime.slice(11,16)),$(".forecast-temp-3").html(Math.round(t[r].parameters[1].values[0])+"°"),$(".forecast-time-4").html(t[n].validTime.slice(11,16)),$(".forecast-temp-4").html(Math.round(t[n].parameters[1].values[0])+"°"),$(".forecast-time-5").html(t[o].validTime.slice(11,16)),$(".forecast-temp-5").html(Math.round(t[o].parameters[1].values[0])+"°"),$(".forecast-time-6").html(t[h].validTime.slice(11,16)),$(".forecast-temp-6").html(Math.round(t[h].parameters[1].values[0])+"°"),$(".forecast-time-7").html(t[m].validTime.slice(11,16)),$(".forecast-temp-7").html(Math.round(t[m].parameters[1].values[0])+"°"),$(".forecast-time-8").html(t[g].validTime.slice(11,16)),$(".forecast-temp-8").html(Math.round(t[g].parameters[1].values[0])+"°"),$(".forecast-time-9").html(t[l].validTime.slice(11,16)),$(".forecast-temp-9").html(Math.round(t[l].parameters[1].values[0])+"°"),$(".forecast-time-10").html(t[d].validTime.slice(11,16)),$(".forecast-temp-10").html(Math.round(t[d].parameters[1].values[0])+"°")}(t),r[0].parameters[18].values[0]),o=(new Date).getHours();
// If it's night it displays different icons in the switch statement
if(0==o||1==o||2==o||3==o||4==o||22==o||23==o)
// Night
switch(n){case 1:$("#theDiv").html('<img id="theImg" src="images/weathericons/moon-b.png"/><h3 id="theWeather">Klart</h3>');break;case 2:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Mest klart</h3>');break;case 3:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Växlande molnighet</h3>');break;case 4:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-night-b.png"/><h3 id="theWeather">Halvklart</h3>');break;case 5:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Målnigt</h3>');break;case 6:$("#theDiv").html('<img id="theImg" src="images/weathericons/overcast-b.png"/><h3 id="theWeather">Mulet</h3>');break;case 7:$("#theDiv").html('<img id="theImg" src="images/weathericons/fog-b.png"/><h3 id="theWeather">Dimma</h3>');break;case 8:$("#theDiv").html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regnskurar</h3>');break;case 9:$("#theDiv").html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åskskurar</h3>');break;case 10:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Byar av snöblandat regn</h3>');break;case 11:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöbyar</h3>');break;case 12:$("#theDiv").html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regn</h3>');break;case 13:$("#theDiv").html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åska</h3>');break;case 14:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöblandat regn</h3>');break;case 15:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöfall</h3>')}else
// Day
switch(n){case 1:$("#theDiv").html('<img id="theImg" src="images/weathericons/sun-b.png"/><h3 id="theWeather">Klart</h3>');break;case 2:$("#theDiv").html('<img id="theImg" src="images/weathericons/nearly-clear-sky-b.png"/><h3 id="theWeather">Mest klart</h3>');break;case 3:$("#theDiv").html('<img id="theImg" src="images/weathericons/nearly-clear-sky-b.png"/><h3 id="theWeather">Växlande molnighet</h3>');break;case 4:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Halvklart</h3>');break;case 5:$("#theDiv").html('<img id="theImg" src="images/weathericons/slightly-cloudy-b.png"/><h3 id="theWeather">Målnigt</h3>');break;case 6:$("#theDiv").html('<img id="theImg" src="images/weathericons/overcast-b.png"/><h3 id="theWeather">Mulet</h3>');break;case 7:$("#theDiv").html('<img id="theImg" src="images/weathericons/fog-b.png"/><h3 id="theWeather">Dimma</h3>');break;case 8:$("#theDiv").html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regnskurar</h3>');break;case 9:$("#theDiv").html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åskskurar</h3>');break;case 10:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Byar av snöblandat regn</h3>');break;case 11:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöbyar</h3>');break;case 12:$("#theDiv").html('<img id="theImg" src="images/weathericons/rain-b.png"/><h3 id="theWeather">Regn</h3>');break;case 13:$("#theDiv").html('<img id="theImg" src="images/weathericons/thunder-b.png"/><h3 id="theWeather">Åska</h3>');break;case 14:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöblandat regn</h3>');break;case 15:$("#theDiv").html('<img id="theImg" src="images/weathericons/snow-b.png"/><h3 id="theWeather">Snöfall</h3>')}// End else
return $("#temp-now").html(" "+Math.round(r[0].parameters[1].values[0])+"°")+$("#weather-wind").html("Vindhastighet: "+r[0].parameters[11].values[0]+" "+r[0].parameters[11].unit)+$("#weather-pressure").html("Lufttryck: "+r[0].parameters[0].values[0]+" "+r[0].parameters[0].unit)+$("#symbol").html("Symbol: "+r[0].parameters[18].values[0])}// End smhiWeather
// Function for calculating the parameters
// needed for the getObjects function.
function fullDate(e){var a=new Date,t=a.getFullYear(),s=a.getMonth(),i=a.getDate(),r=a.getHours();return s+=1,s<10&&(s="0"+s),i<10&&(i="0"+i),r<10&&(r="0"+r),t+"-"+s+"-"+i+"T"+r+":00:00Z"}// End fullDate
// function adding black border around tex
function smhiShow(){return'<h2 style="color: white; text-shadow: black 0.1em 0.1em 0.2em">ssss '+data+"</h2>"}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};$(document).ready(function(){setInterval(function(){$("#raindrops").fadeIn(50).delay(50).fadeOut().delay(50).fadeIn(100)},5e3),console.log("animation.js")}),dayDateMonth(),$(document).ready(function(){loader(!0)}),
// Call the open menu function
$("#open-menu").click(function(){openMenu()}),
// Call the close menu function
$("#close-menu").click(function(){closeMenu()}),
// Start clock
startTime(),
// Call the open menu function
$("#show-forecast").click(function(){showForecast()}),
// Call the close menu function
$("#hide-forecast").click(function(){hideForecast()}),
// Run function only when page is done loading
$(document).ready(function(){
// Click to run search function
$("#search-btn").click(callback),
// Press enter to run search function
$("#city-name").keypress(function(){13===event.which&&callback()})});
// Variable with function which activates on click or keydown event.
var callback=function(){loader(!1),
// function, Close dropdown menu after click or keydown enter
closeMenu()};