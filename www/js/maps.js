/**
* Map configuration script:
**/

var map, infoWindow;

var contentString =
'<div id="content-my-location">'+
'<img src="https://66.media.tumblr.com/avatar_cc55c4a5c928_128.pnj" alt="Avatar" style="width:30px">' +
'</div>';

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
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent(contentString);
            infoWindow.open(map);
            map.setCenter(pos);
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

    function plotStuff() {

        /**
        *   ICONS MUST COME FROM A URL
        **/
        var iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

        var icons = {
            cherry1: {
                 icon: iconBase + 'info-i_maps.png'
            },
            cherry2: {
                 icon: iconBase + 'info-i_maps.png'
            }
        };

        var features = [
            {
                position: new google.maps.LatLng(49.2417605,-123.1148133),
                type: 'cherry1'
            }, {
                position: new google.maps.LatLng(49.2389174,-123.106419),
                type: 'cherry2'
            }, {
                position: new google.maps.LatLng(49.2350037,-123.1226642),
                type: 'cherry1'
            }
        ];

        // Create markers.
        for (var i = 0; i < features.length; i++) {
            var marker = new google.maps.Marker({
                position: features[i].position,
                icon: icons[features[i].type].icon,
                map: map
            });
        };

    }






















    //....
