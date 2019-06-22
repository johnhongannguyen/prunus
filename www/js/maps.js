/**
* Map configuration script:
**/

var map, infoWindow;

var contentString =
// '<div id="content-my-location">'+
// '<img src="https://66.media.tumblr.com/avatar_cc55c4a5c928_128.pnj" alt="Avatar" style="width:30px">' +
// '</div>';
'<img src="https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fmy_location_icon_30px.png?alt=media&token=beb01b67-e15c-4d60-a01b-47e7781f929c" alt="Avatar" style="width:30px">'

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

            var marker = new google.maps.Marker({
                position: pos,
                icon: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fmy_location_icon_30px.png?alt=media&token=beb01b67-e15c-4d60-a01b-47e7781f929c",
                map: map
            });

            // markers.push(marker)
            // infoWindow.setPosition(pos);
            // infoWindow.setContent(contentString);
            // infoWindow.open(map);
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


                var marker = new google.maps.Marker({
                    position: pos,
                    icon: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fmy_location_icon_30px.png?alt=media&token=beb01b67-e15c-4d60-a01b-47e7781f929c",
                    map: map
                });

                // markers.push(marker)

                // infoWindow.setPosition(pos);
                // infoWindow.open(map);
                map.setCenter(pos);


                // infoWindow.setContent(contentString);

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
                        removeMarker(key);
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
            icon: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fprunus_geometric_25px.png?alt=media&token=237e1db2-0a46-4ed5-be7d-0210d081702f",
            map: map,
            key_id: key
        });

        //Segue to View Tree
        marker.addListener('click', function() {
            //Method to handle transition to the View Tree screen
            appNavigator.openPageViewTree(key)
        });

        markers.push(marker);
    }

    function removeMarker(key){

        markers.forEach(function(item, index){

            if(item.key_id == key){
                item.setMap(null);
            }

        });
    }

    // Sets the map on all markers in the array.
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        markers = [];
    }





















    //....
