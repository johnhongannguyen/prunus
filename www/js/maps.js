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

var MAP_ICON_USER_SIZE;
var MAP_ICON_TREE_SIZE;

function initMap() {

    MAP_ICON_USER_SIZE = new google.maps.Size(28, 32);
    MAP_ICON_TREE_SIZE = new google.maps.Size(25, 25);

    map = new google.maps.Map(document.getElementById('map'), {
        // center: {lat: -34.397, lng: 150.644},
        zoom: 15,
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


            if(TESTING_DEBUG){
                pos = {
                    lat: 49.240949,
                    lng: -123.110678
                };
            }


            var marker = new google.maps.Marker({
                position: pos,
                icon: {
                    // size: new google.maps.Size(10, 10),
                    scaledSize: MAP_ICON_USER_SIZE,
                    url: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fmy_location_91x104.png?alt=media&token=ff826d46-91bf-4fea-9af3-13147f13382f"
                },
                zIndex: 1,
                map: map
            });

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

                if(TESTING_DEBUG){
                    pos = {
                        lat: 49.240949,
                        lng: -123.110678
                    };
                }

                var marker = new google.maps.Marker({
                    position: pos,
                    icon: {
                        // size: new google.maps.Size(10, 10),
                        scaledSize: MAP_ICON_USER_SIZE,
                        url: "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fmy_location_91x104.png?alt=media&token=ff826d46-91bf-4fea-9af3-13147f13382f"
                    },
                    zIndex: 1,
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


        var hasInitializedNearbyTrees = false;

        //todo - remove this - add no-trees-nearby validation
        setTimeout(function() {
            appLoader.hide(".loader-map-container");
        }, 6000)


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

                        if(!hasInitializedNearbyTrees){
                            hasInitializedNearbyTrees = false;
                            appLoader.hide(".loader-map-container");
                        }

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

        var treeIcon;
        treeCRUD.readBloom(key, function(tree, isFavorite) {

            switch (tree.blooming) {
                case "1":

                if(isFavorite){
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Ftrees_icons%2Fic-tree-pin-bloom-low-fav.png?alt=media&token=0df73a3a-ed9b-40a2-b31f-26d1aac7dccb";
                } else{
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fic-tree-pin-bloom-min.png?alt=media&token=1aefd682-d90c-4aba-99ff-892f7569b994";
                }


                break;
                case "2":
                case "3":

                if(isFavorite){
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Ftrees_icons%2Fic-tree-pin-bloom-med-fav.png?alt=media&token=cb7c8f34-9155-4c4e-9b2a-7928e3be9bb4";
                } else{
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fic-tree-pin-bloom-mid.png?alt=media&token=038dfc8d-a99d-41bf-b2a4-bafa10bc50fa";
                }

                break;
                case "4":
                case "5":

                if(isFavorite){
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Ftrees_icons%2Fic-tree-pin-bloom-max-fav.png?alt=media&token=4d632a17-873f-4461-9e84-a0d5342cf0a2";
                } else{
                    treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fic-tree-pin-bloom-max.png?alt=media&token=4c86ccf0-d974-426e-a725-5c5ff3c85c35";
                }

                break;
                default:
                treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fic-tree-pin-bloom-min.png?alt=media&token=1aefd682-d90c-4aba-99ff-892f7569b994";
                // treeIcon = "https://firebasestorage.googleapis.com/v0/b/prunus-8d0a2.appspot.com/o/icons%2Fic-tree-pin-fav.png?alt=media&token=28361497-c1a7-4f6e-bbee-0bdfa9e49ec4";

            }

            var marker = new google.maps.Marker({
                position: {
                    lat: location[0],
                    lng: location[1]
                },
                icon: {
                    // size: new google.maps.Size(10, 10),
                    scaledSize: MAP_ICON_TREE_SIZE,
                    url: treeIcon
                },
                zIndex: 2,
                map: map,

                key_id: key //Extra property added to the icon object.
            });

            //Segue to View Tree
            marker.addListener('click', function() {
                //Method to handle transition to the View Tree screen
                appNavigator.openPageViewTree(key)
            });

            markers.push(marker);
        })
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
