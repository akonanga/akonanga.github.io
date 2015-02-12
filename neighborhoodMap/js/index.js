/**
 * Created by vidaluson on 2/10/15.
 */

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

var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 10,
    center: new google.maps.LatLng(37.769430, -121.991443),
    title: 'Mi Casa',
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var viewModel = {
    points: ko.observableArray([
        new point('I\'m here', 37.769430, -121.991443),
        new point('Hi Ho Hi Ho, its off to work I go!!!', 37.765087, -121.962852)
    ])
};

ko.applyBindings(viewModel);