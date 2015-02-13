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

function point(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        draggable: true
    });
    markers.push(marker);
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
    }
];

var List = function (data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
};

/*var myMarkers = [
    new point('Mi Casa No Su Casa', 37.769430, -121.991443),
    new point('Mi Trabajo Su Trabajo', 37.765087, -121.962852)
];*/

/*var viewModel = {
    points: ko.observableArray([
        new point('I\'m here', 37.769430, -121.991443),
        new point('Hi Ho Hi Ho, its off to work I go!!!', 37.765087, -121.962852)
    ])
};*/
var myMarkers = [];

var ViewModel = function () {
    var self = this;
    this.myList = ko.observableArray([]);
    this.myMapMarkers = ko.observableArray([]);

    initialMyList.forEach(function (listItem) {
        self.myMapMarkers.push(new point(listItem.name, listItem.lat, listItem.lng));
        self.myList.push(new List(listItem));
    });

    this.currentMarker = ko.observable();

    this.gotoMarker = function (clickedListItem) {
        //console.log(markers.length,markers[1]['position'].k,markers[1]['position'].D,markers[1]['title']);
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
        self.myMapMarkers.push(new point(clickedListItem.name(), clickedListItem.lat(), clickedListItem.lng()));
    }
};

ko.applyBindings(new ViewModel);
initialize();