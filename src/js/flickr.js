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

function flickrImg(city) {
    
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
