## Neighborhood Map Project

###Project Overview

You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

###Why this Project?

The neighborhood tour application is complex enough and incorporates a variety of data points that it can easily become unwieldy to manage. There are a number of frameworks, libraries and APIs available to make this process more manageable and many employers are looking for specific skills in using these packages.

###What will I Learn?

You will learn how design patterns assist in developing a manageable codebase. You’ll then explore how frameworks can decrease the time required developing an application and provide a number of utilities for you to use. Finally, you’ll implement third-party APIs that provide valuable data sets that can improve the quality of your application.

###How does this help my Career?

1.  Interacting with API servers is the primary function of Front-End Web Developers
1.  Use of third-party libraries and APIs is a standard and acceptable practice that is encouraged

### How will I complete this Project?

1.  Review our course JavaScript Design Patterns.
1.  Download the [Knockout framework](http://knockoutjs.com/).
1.  Write code required to add a full-screen map to your page using the Google Maps API.
1.  Write code required to add map markers identifying a number of locations your are interested in within this neighborhood.
1.  Implement the search bar functionality to search your map markers.
1.  Implement a list view of the identified locations.
1.  Add additional functionality using third-party APIs when a map marker, search result, or list view entry is clicked (ex. Yelp reviews, Wikipedia, StreetView/Flickr images, etc). If you need a refresher on making AJAX requests to third-party servers, check out our Intro to AJAX course.


###Helpful Resources

None of these are required, but they may be helpful.

1.  [Foursquare API](https://developer.foursquare.com/start)
    ####Doc:
    1.  [https://developer.foursquare.com/start/search](https://developer.foursquare.com/start/search)

    ####Sample:
    1.  [https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&client_id=C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY&client_secret=3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5&v=20150211](https://api.foursquare.com/v2/venues/explore?ll=40.7,-74&client_id=C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY&client_secret=3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5&v=20150211)

1.  [MediaWikiAPI for Wikipedia](http://www.mediawiki.org/wiki/API%3aMain_page)
    ####Sample:
    1.  [http://en.wikipedia.org/w/api.php?format=jsonfm&action=opensearch&search=san%20ramon](http://en.wikipedia.org/w/api.php?format=jsonfm&action=opensearch&search=san%20ramon) for formatted output not useful programmatically but only for debugging
    1.  [http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=san%20ramon](http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=san%20ramon) notice the format parm.  This is use when inside a javascript.

1.  [Google Maps Street View Service](https://developers.google.com/maps/documentation/javascript/streetview)

1.  [Google Maps](https://developers.google.com/maps/documentation/)

### To execute the Neighborhood Map site:
Click [http://akonanga.github.io/neighborhoodMap/index.html](http://akonanga.github.io/neighborhoodMap/index.html).

### Additional resources that helped me accomplish this project
1.  I used a cdn namely [//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js](//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js) instead of downloading Knockout Framework
1.  [http://www.w3schools.com/googleapi/](http://www.w3schools.com/googleapi/)
1.  [http://code.tutsplus.com/courses/custom-interactive-maps-with-the-google-maps-api/lessons/setting-up-a-key](http://code.tutsplus.com/courses/custom-interactive-maps-with-the-google-maps-api/lessons/setting-up-a-key)
1.  [https://developers.google.com/maps/documentation/javascript/examples/places-searchbox](https://developers.google.com/maps/documentation/javascript/examples/places-searchbox) to place search box in google maps with autocomplete
1.  [https://developer.yahoo.com/weather/](https://developer.yahoo.com/weather/)

####Google Maps Resources/Samples:
1.  [http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs](http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs)
1.  [http://jsfiddle.net/rniemeyer/FcSmA/](http://jsfiddle.net/rniemeyer/FcSmA/)
1.  [http://www.drawbackz.com/stack/103921/google-maps-api-v3-recenter-the-map-to-a-marker.html](http://www.drawbackz.com/stack/103921/google-maps-api-v3-recenter-the-map-to-a-marker.html)
1.  [http://stackoverflow.com/questions/5514559/google-maps-set-center-set-center-point-and-set-more-points](http://stackoverflow.com/questions/5514559/google-maps-set-center-set-center-point-and-set-more-points)
1.  [http://stackoverflow.com/questions/18343930/href-and-mailto-links-in-knockoutjs](http://stackoverflow.com/questions/18343930/href-and-mailto-links-in-knockoutjs)
        learn how to do <a> with data-bind
