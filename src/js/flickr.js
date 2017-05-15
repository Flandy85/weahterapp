$("button").on("click", handleButtonClick);

function jsonFlickrFeed(json) {
  //console.log(json);
  
    var flickr = json.items;
   console.log(flickr[0].media);
   $("<img />").attr("src", flickr[0].media.m).appendTo("#images"); 
    
//  $.each(json.items, function(i, item) {
//    $("<img />").attr("src", item.media.m).appendTo("#images"); 
//  });
};

function handleButtonClick() {
    
    var bla = $('#txt_name').val();
    
    
//  $("button").remove();
  
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": bla, "format": "json" }
  });
}


/*
index.html tagsen...
   <button id="button">I Love cats!</button>
   <input type="text" id="txt_name"/>

<div id="images"></div>
*/