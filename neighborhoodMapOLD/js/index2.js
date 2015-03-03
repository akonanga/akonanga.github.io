/**
 * Created by vidaluson on 2/10/15.
 */

var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(37.769430, -121.991443),
    title: 'Mi Casa',
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var markers =[];
var markPoints = [];

function markPoint(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        draggable: true
    });
    markPoints.push(marker);
    map.panTo(marker.getPosition())
    //map.setCenter(marker.getPosition())

    //if you need the position while dragging
    google.maps.event.addListener(marker, 'drag', function () {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));

    //if you just need to update it when the user is done dragging
    google.maps.event.addListener(marker, 'dragend', function () {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));
}

function initialize() {
    //var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //});

    //var defaultBounds = new google.maps.LatLngBounds(
    //    new google.maps.LatLng(-33.8902, 151.1759),
    //    new google.maps.LatLng(-33.8474, 151.2631));
    //map.fitBounds(defaultBounds);

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
}

var initialMyList = [
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

var myList = function (data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
};

var MarkerList = function (data) {
    this.title = ko.observable(data['title']);
    this.lat = data['position'].k;
    this.lng = data['position'].D;
}

/*var myMarkers = [
    new markPoint('Mi Casa No Su Casa', 37.769430, -121.991443),
    new markPoint('Mi Trabajo Su Trabajo', 37.765087, -121.962852)
];*/

/*var viewModel = {
    points: ko.observableArray([
        new markPoint('I\'m here', 37.769430, -121.991443),
        new markPoint('Hi Ho Hi Ho, its off to work I go!!!', 37.765087, -121.962852)
    ])
};*/
//var myMarkers = [];


var ViewModel = function () {
    var self = this;
    this.myMarkers = ko.observableArray([]);
    this.myMarkPointList = ko.observableArray([]);
    //var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //});

    //var defaultBounds = new google.maps.LatLngBounds(
    //    new google.maps.LatLng(-33.8902, 151.1759),
    //    new google.maps.LatLng(-33.8474, 151.2631));
    //map.fitBounds(defaultBounds);

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
            self.myMarkers.push(marker);

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
    //this.myList = ko.observableArray([]);
    this.myMapMarkers = ko.observableArray([]);
    this.currentLatLng = ko.observable();

    initialMyList.forEach(function (listItem) {
        self.myMapMarkers.push(new markPoint(listItem.name, listItem.lat, listItem.lng));
        self.myMarkPointList.push(new myList(listItem));
    });
    map.setZoom(14);

    self.currentLatLng = ko.observable(initialMyList[0]);
    console.log(self.currentLatLng());

    //this.myList = ko.observableArray(markers);
    //this.myMarkers = ko.observableArray(markers);

    this.currentMarker = ko.observable();

    self.goToPoint = function(clickedPoint) {
        console.log(clickedPoint);
        map.setCenter(new google.maps.LatLng(clickedPoint['position'].k, clickedPoint['position'].D));
        //map.setZoom(15);
    };

    self.processLatLng = function (thisLatLng) {
        console.log(thisLatLng);
    };

    this.gotoMarker = function (clickedListItem) {
        console.log(markers);
        console.log(markers.length,markers[1]['position'].k,markers[1]['position'].D,markers[1]['title']);
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
        self.myMapMarkers.push(new markPoint(clickedListItem.name(), clickedListItem.lat(), clickedListItem.lng()));
    }
};

ko.applyBindings(new ViewModel);