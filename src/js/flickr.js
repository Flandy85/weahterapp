
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

}
