
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street');
    var $city = $('#city');
    var location = $street.val() + ', ' + $city.val();
    $greeting.text('So you want to live at ' + location);
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + location + '">');

    //New York Times
    var nyTimesAPIKey = '910c1f13f2d3f011669907b5e62dc5f8:11:71159140';
    var searchTerm = $city.val();
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + '&api-key=' + nyTimesAPIKey;
    $.getJSON(nyTimesURL, function (data) {
        console.log(data);
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
