/**
 * Created by vidaluson on 2/9/15.
 */


var markers =[];
var markPoints = [];
var client_id = 'C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY';
var client_secret = '3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5';


var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(37.769430, -121.991443),
    title: 'Mi Casa',
    mapTypeId: google.maps.MapTypeId.ROADMAP
});


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

function mapSearch(self) {
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
            //console.log(marker);
            var markerItem = {
                name: marker.title,
                lat: marker['position'].k,
                lng: marker['position'].D,
                isAddlTextFetched: false,
                addlTextSummary: null
            };
            self.markerList.push(new Marker(markerItem));
            //self.currentMarker(markerItem);

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

function getAddlInfo(self, thisMarker) {
    var today = new Date();
    var v = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDate())).slice(-2);
    var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?ll=' + thisMarker.lat() + ',' + thisMarker.lng() + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + v;
    $.getJSON(foursquareURL, function (data) {
        //console.log(data);
        var i = 0;
        var upTo = 5;
        var dataItems = data.response.groups[0].items;
        var dataItemsArray = [];
        do{
            var dataAddlText = {
                venue: dataItems[i].venue.name,
                summary: dataItems[i].tips[0].text,
                url: dataItems[i].venue.url
            };
            dataItemsArray[i] = dataAddlText;
            ++i;
        }while(i < 5 && i < dataItems.length);
        self.currentMarker().addlTextSummary(dataItemsArray);
        self.currentMarker().isAddlTextFetched(true);

        self.addlInfoList().length = 0;
        self.currentMarker().addlTextSummary().forEach(function (addlInfoItem) {
            self.addlInfoList.push(new AddlInfo(addlInfoItem));
        });
        self.currentSummary(self.currentMarker().addlTextSummary()[0]);
        //self.currentSummary(dataItemsArray[0]);
    }).error(function (evt) {
        //$nytHeaderElem.text('New York Times Articles Count Not Be Loaded');
    });
}

/*
 {
 name: 'Mi Casa No Su Casa',
 lat: 37.769430,
 lng: -121.991443
 },
 */

var initialMarkers = [
    {
        name: 'AT&T San Ramon',
        lat: 37.766064,
        lng: -121.963439,
        isAddlTextFetched: false,
        addlTextSummary: null
    },
    {
        name: 'San Ramon Community Center',
        lat: 37.765266,
        lng: -121.953126,
        isAddlTextFetched: false,
        addlTextSummary: null
    },
    {
        name: 'San Ramon Regional Medical Center',
        lat: 37.776065,
        lng: -121.958221,
        isAddlTextFetched: false,
        addlTextSummary: null
    },
    {
        name: 'St. Joan of Arc Parish',
        lat: 37.768081,
        lng: -121.972779,
        isAddlTextFetched: false,
        addlTextSummary: null
    }
];


//this.fetchedData = asyncDependentObservable(function () {
//    return $.ajax("http://api.worldbank.org/country?prefix=?", {
//        dataType: "jsonp",
//        data: {per_page: this.numberToShow, region: this.chosenRegion, format: "jsonp"}
//    }).pipe(function (data) {
//        return data[1]
//    });
//}, this);


var AddlInfo = function (data) {
    this.venue = ko.observable(data.venue);
    this.summary = ko.observable(data.summary);
    this.url = ko.observable(data.url);
};

var Marker = function (data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.isAddlTextFetched = ko.observable(data.isAddlTextFetched);
    this.addlTextSummary = ko.observable(data.addlTextSummary);
    /*    this.addlTextSummary = asyncComputed(function() {
     // Whenever "pageIndex", "sortColumn", or "sortDirection" change, this function will re-run
     var addlData;
     var client_id = 'C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY';
     var client_secret = '3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5';
     var today = new Date();
     var v = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDate())).slice(-2);
     var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?ll=' + data.lat + ',' + data.lng + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + v;
     return $.ajax(foursquareURL, {
     dataType: "json"}).pipe(function (data) {
     return data[1]
     });
     }, this);*/
    /*    this.addlTextSummary = ko.observable();
     ko.computed(function () {
     //New York Times
     var addlData;
     var client_id = 'C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY';
     var client_secret = '3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5';
     var today = new Date();
     var v = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDate())).slice(-2);
     var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?ll=' + data.lat + ',' + data.lng + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + v;
     $.getJSON(foursquareURL, function (data) {
     console.log(data);
     this.addlTextSummary = data;
     }).error(function (evt) {
     //$nytHeaderElem.text('New York Times Articles Count Not Be Loaded');
     });
     }, this);*/
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


    this.currentSummary = ko.observable();

//here
    mapSearch(self);



    this.currentMarker = ko.observable(this.markerList()[0]);
    new markPoint(this.markerList()[0].name(), this.markerList()[0].lat(), this.markerList()[0].lng());

//here ajax
    getAddlInfo(self, this.markerList()[0]);

    this.addlInfoList = ko.observableArray([]);

    this.changeMarker = function (clickedMarker) {
        //console.log(clickedMarker.isAddlTextFetched());
        self.currentMarker(clickedMarker);
        if(typeof clickedMarker.name === 'function') {
            new markPoint(clickedMarker.name(), clickedMarker.lat(), clickedMarker.lng());
        } else {
            //map.setCenter(new google.maps.LatLng(clickedMarker.lat(), clickedMarker.lng()));
            new markPoint(clickedMarker.name, clickedMarker.lat, clickedMarker.lng);
        }
        if(!self.currentMarker().isAddlTextFetched()) {
            getAddlInfo(self, self.currentMarker());
            /*
             var today = new Date();
             var v = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDate())).slice(-2);
             var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?ll=' + self.currentMarker().lat() + ',' + self.currentMarker().lng() + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + v;
             $.getJSON(foursquareURL, function (data) {
             //console.log(data);
             var i = 0;
             var upTo = 5;
             var dataItems = data.response.groups[0].items;
             var dataItemsArray = [];
             do{
             var dataAddlText = {
             venue: dataItems[i].venue.name,
             summary: dataItems[i].tips[0].text,
             url: dataItems[i].venue.url
             };
             dataItemsArray[i] = dataAddlText;
             ++i;
             }while(i < 5 && i < dataItems.length);
             self.currentMarker().addlTextSummary(dataItemsArray);
             self.currentMarker().isAddlTextFetched(true);

             self.addlInfoList().length = 0;
             self.currentMarker().addlTextSummary().forEach(function (addlInfoItem) {
             self.addlInfoList.push(new AddlInfo(addlInfoItem));
             });
             self.currentSummary(self.currentMarker().addlTextSummary()[0]);
             //self.currentSummary(dataItemsArray[0]);
             }).error(function (evt) {
             //$nytHeaderElem.text('New York Times Articles Count Not Be Loaded');
             });
             */
        } else {
            self.addlInfoList().length = 0;
            self.currentMarker().addlTextSummary().forEach(function (addlInfoItem) {
                self.addlInfoList.push(new AddlInfo(addlInfoItem));
            });
            self.currentSummary(self.currentMarker().addlTextSummary()[0]);
        }
    };

    this.showSummary = function (clickedVenue) {
        self.currentSummary(clickedVenue);
    }
};

ko.applyBindings(new ViewModel());