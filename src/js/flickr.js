//$("button").on("click", handleButtonClick);

function jsonFlickrFeed(json) {
  //console.log(json);
  
    const flickr = json.items;
   //console.log(flickr[0].media);
   // $("#images").html('<img src="' + flickr[0].media.m + '">');
   $('body').css({"background": "url(" + flickr[0].media.m + ")",
    "background-size": "cover",
    "background-repeat": "no-repeat"




    });


    
//  $.each(json.items, function(i, item) {
//    $("<img />").attr("src", item.media.m).appendTo("#images"); 
//  });
};

function handleButtonClick(city) {
    
    var bla = $('.txt_name').val();
    
//  $("button").remove();
  
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": city, "format": "json" }
  });
}


/*
index.html tagsen...
   <button id="button">I Love cats!</button>
   <input type="text" id="txt_name"/>

<div id="images"></div>
*/