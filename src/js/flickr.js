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
function handleButtonClick(city) {
    
    var bla = $('.txt_name').val();
  
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": city, "format": "json" }
  });
}
