/**
 * Created by vidaluson on 2/9/15.
 */

var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(37.769430, -121.991443),
    title: 'Mi Casa',
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var markers =[];

var initialMarkers = [
    {
        name: 'Mi Casa No Su Casa',
        lat: 37.769430,
        lng: -121.991443
    },
    {
        name: 'Mi Trabajo Su Trabajo',
        lat: 37.765087,
        lng: -121.962852
    },
    {
        name: 'San Ramon Community Center',
        lat: 37.765266,
        lng: -121.953126
    }
];

var Marker = function (data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    //this.imgSrc = ko.observable(data.imgSrc);
    //this.level = ko.computed(function () {
    //    var level;
    //    var clickCnt = this.clickCount();
    //    if(clickCnt < 2) {
    //        level = 'Infant';
    //    } else
    //    if(clickCnt < 4) {
    //        level = 'Toddler';
    //    } else
    //    if(clickCnt < 13) {
    //        level = 'Child';
    //    } else
    //    if(clickCnt < 20) {
    //        level = 'Teen';
    //    } else
    //    if(clickCnt >= 20) {
    //        level = 'Adult';
    //    }
    //    return level;
    //}, this);
};


var ViewModel = function () {
    var self = this;

    this.markerList = ko.observableArray([]);

    initialMarkers.forEach(function (markerItem) {
        self.markerList.push(new Marker(markerItem));
    });

    this.currentMarker = ko.observable(this.markerList()[0]);




    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(marker);
            console.log(marker);
            var markerItem = {
                name: marker.title,
                lat: marker['position'].k,
                lng: marker['position'].D
            };
            self.markerList.push(markerItem);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
    });
    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });




    this.changeMarker = function (clickedMarker) {
        self.currentMarker(clickedMarker);
        map.setCenter(new google.maps.LatLng(clickedMarker.lat, clickedMarker.lng));
    }
};

ko.applyBindings(new ViewModel());