/**
 * Created by vidaluson on 3/2/15.
 */

var ViewModel = function () {
    var self = this;

    var map;
    var gMapInfoWindow;
    var service;
    var markers = [];

    var myDefaultNeighborhood = {
        name: 'San Ramon',
        lat: 37.766064,
        lng: -121.963439
    };

    self.isGoogleIssueVisible = ko.observable(false);
    if(typeof google === 'undefined') {
        //$('#issueGoogle').removeClass('hidden').addClass('show');
        self.isGoogleIssueVisible(true);
    } else {
        //init google map BEGIN
        //initializeMap(myDefaultNeighborhood);
        var mapOptions = {
            center: new google.maps.LatLng(myDefaultNeighborhood.lat, myDefaultNeighborhood.lng),
            zoom: 13
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        gMapInfoWindow = new google.maps.InfoWindow();
        //init google map END

        self.currentNeighborhood = ko.observable(myDefaultNeighborhood);
        self.currentNeighborhoodName = ko.observable(myDefaultNeighborhood.name);

        self.computed_currentNeighborhoodName = ko.computed(function () {
            map_currentNeighborhood(self.currentNeighborhoodName());
        });

        self.isRestTextVisible = ko.observable(true);
        self.toggleRestText = function () {
            self.isRestTextVisible(!self.isRestTextVisible());
        };

        self.isPOIListVisible = ko.observable(true);
        self.togglePOIList = function () {
            self.isPOIListVisible(!self.isPOIListVisible());
        };
    }

    //function initializeMap(thisNeighborhood) {
    //    var mapOptions = {
    //        center: new google.maps.LatLng(thisNeighborhood.lat, thisNeighborhood.lng),
    //        zoom: 13
    //    };
    //    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //    gMapInfoWindow = new google.maps.InfoWindow();
    //}

    //self.map_currentNeighborhood = function(thisNeighborhoodName) {
    function map_currentNeighborhood(thisNeighborhoodName) {
        //https://developers.google.com/maps/documentation/javascript/places
        console.log('1. map_currentNeighborhood');
        var request = {
            query: thisNeighborhoodName
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }

    // Checks that the PlacesServiceStatus is OK, and adds a marker
    // using the place ID and location from the PlacesService.
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log('1.callback',results[0],status);
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var newCenter = new google.maps.LatLng(lat, lng);
            map.setCenter(newCenter);
            var image = 'images/beachflag.png';
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: results[0].name,
                position: results[0].geometry.location
            });
            markers.push(marker);
            //var marker = new google.maps.Marker({
            //    map: map,
            //    place: {
            //        placeId: results[0].place_id,
            //        location: results[0].geometry.location
            //    }
            //});
        }
    }
};


ko.applyBindings(new ViewModel());

