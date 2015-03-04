/**
 * Created by vidaluson on 3/2/15.
 */

var ViewModel = function () {
    var self = this;

    var map;
    var infoWindow;
    var service;
    var markers = [];
    var numOfVenues = 20;

    self.is4SquareIssueVisible = ko.observable(false);
    var client_id = 'C4KJ2R33H3VRWV4PGTJWPL1H4Q2YZ1KZMYAASDDJ5PV2JZPY';
    var client_secret = '3HVIXSPYGDXRUSGQSYUVSIA3QWHQJ3YMQQESLYKZKB2RVIQ5';

    var myDefaultNeighborhood = {
        name: 'San Ramon',
        lat: 37.766064,
        lng: -121.963439
    };

    var map_currentNeighborhood = function(thisNeighborhoodName) {
        //https://developers.google.com/maps/documentation/javascript/places
        var request = {
            query: thisNeighborhoodName
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    };

    // Checks that the PlacesServiceStatus is OK, and adds a marker
    // using the place ID and location from the PlacesService.
    var callback = function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
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
            get_infoFrom4Square(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            //var marker = new google.maps.Marker({
            //    map: map,
            //    place: {
            //        placeId: results[0].place_id,
            //        location: results[0].geometry.location
            //    }
            //});
        }
    };

    var get_infoFrom4Square = function (lat, lng) {
        var today = new Date();
        var v = today.getFullYear().toString() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + (today.getDate())).slice(-2);
        var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?ll=' + lat + ',' + lng + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + v;
        $.getJSON(foursquareURL, function (data) {
            var i = 0;
            var dataItems = data.response.groups[0].items;
            var dataItemsArray = [];
            do{
                var dataAddlText = {
                    venue: dataItems[i].venue.name,
                    address: dataItems[i].venue.location.formattedAddress,
                    telephone: (typeof dataItems[i].venue.contact.formattedPhone === 'undefined') ? 'none' : dataItems[i].venue.contact.formattedPhone,
                    tip: dataItems[i].tips[0].text,
                    url: dataItems[i].venue.url,
                    lat: dataItems[i].venue.location.lat,
                    lng: dataItems[i].venue.location.lng
                };
                dataItemsArray[i] = dataAddlText;
                // Create a marker for each place.
                var completeAddr = dataAddlText.address.join('\n');
                var marker = new google.maps.Marker({
                    map: map,
                    title: dataAddlText.venue + '\n' + completeAddr + '\n' + dataAddlText.telephone,
                    position: new google.maps.LatLng(dataAddlText.lat, dataAddlText.lng)
                });
                markers.push(marker);
                google.maps.event.addListener(marker, "click", (function(marker, i) {
                    return function() {
                        map.panTo(marker.getPosition());
                        infoWindow.setContent(
                            "<div>" +
                            "<a href='" + dataItemsArray[i].url + "' target='_blank'><h3>" + dataItemsArray[i].venue + "</h3></a>" +
                            "<p><span style='font-weight:bold;'>Address: </span>" + dataItemsArray[i].address.join(' ') + "</p>" +
                            "<p><span style='font-weight:bold;'>Telephone: </span>" + dataItemsArray[i].telephone + "</p>" +
                            "<p><span style='font-weight:bold;'>Tip: </span>" + dataItemsArray[i].tip + "</p>" +
                            "</div>"
                        );
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
                ++i;
            }while(i < numOfVenues && i < dataItems.length);
        }).error(function (evt) {
            //$nytHeaderElem.text('New York Times Articles Count Not Be Loaded');
            self.is4SquareIssueVisible(true);
        });
    };

    self.isGoogleIssueVisible = ko.observable(false);
    if(typeof google === 'undefined') {
        self.isGoogleIssueVisible(true);
    } else {
        //init google map BEGIN
        var mapOptions = {
            center: new google.maps.LatLng(myDefaultNeighborhood.lat, myDefaultNeighborhood.lng),
            zoom: 13
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        infoWindow = new google.maps.InfoWindow();
        //init google map END

        self.currentNeighborhood = ko.observable(myDefaultNeighborhood);
        self.currentNeighborhoodName = ko.observable(myDefaultNeighborhood.name);
        map_currentNeighborhood(self.currentNeighborhoodName());

        self.currentNeighborhoodName.subscribe(function () {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
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
};


ko.applyBindings(new ViewModel());

