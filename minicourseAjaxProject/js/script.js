
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
        var articles = [];
        var responseArticles = data.response.docs;
        for (var article in responseArticles) {
            var headline = responseArticles[article].headline.main;
            var webUrl = '<a href="' + responseArticles[article].web_url + '">' + headline + '</a>';
            var leadParagraph = '<p>' + responseArticles[article].lead_paragraph + '</p>';
            articles.push('<li class="article">' + webUrl + leadParagraph + '</li>');
        };
        $nytHeaderElem.text('New York Times Articles About ' + $city.val());
        $nytElem.append(articles.join(''));
    }).error(function (evt) {
        $nytHeaderElem.text('New York Times Articles Count Not Be Loaded');
    });

    //wikipedia
    var searchTerm = $city.val();
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + searchTerm + '&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text("failed to get wikipedia resources");
    });
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function (response) {
            console.log(response);
            var urlTexts = response['1'];
            var urlLinks = response['3'];
            var urls = [];
            for (var urlPos in urlLinks) {
                urls.push('<li><a href="' +  urlLinks[urlPos] + '">' + urlTexts[urlPos] + '</a>'+ '</li>');
            }
            $wikiElem.text('').append(urls.join(''));
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
