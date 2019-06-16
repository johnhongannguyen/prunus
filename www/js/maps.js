/**
* Map configuration script:
**/

var map, infoWindow;

var contentString =
'<div id="content-my-location">'+
'<img src="https://66.media.tumblr.com/avatar_cc55c4a5c928_128.pnj" alt="Avatar" style="width:30px">' +
'</div>';

var geoQuery = null;
var markers = [];


var pos;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // center: {lat: -34.397, lng: 150.644},
        zoom: 12,
        disableDefaultUI: true,
        mapTypeId: 'roadmap'
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent(contentString);
            infoWindow.open(map);
            map.setCenter(pos);


            getTreesAround();

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    function myLocation() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.open(map);
                map.setCenter(pos);


                infoWindow.setContent(contentString);

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function getTreesAround(){

        if(geoQuery != null){
            geoQuery.cancel();
        }

        clearMarkers();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                //remember to cancel this geoQuery later
                geoQuery = treeLocationService.listenToNearbyTrees(
                    [pos.lat, pos.lng],

                    function(key, location, distance) {
                        // console.log(key + " entered query at " + location + " (" + distance + " km from center)");
                        addMarker(key, location);

                    },

                    function(key, location, distance) {
                        // console.log(key + " exited query to " + location + " (" + distance + " km from center)");

                    }
                );


            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    }

    //Adds a single marker to the map. location -> [lat,lng]
    function addMarker(key, location) {

        var marker = new google.maps.Marker({
            position: {
                lat: location[0],
                lng: location[1]
            },
            icon: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fsakura_tree_50px.png?alt=media&token=751530af-b889-49bd-b9e8-99feec7867a5",
            map: map
        });

        //Segue to View Tree
        marker.addListener('click', function() {
            //Method to handle transition to the View Tree screen
            appNavigator.openPageViewTree(key)
        });

        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        markers = [];
    }





















    //....
