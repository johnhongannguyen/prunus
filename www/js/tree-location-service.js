var treeLocationService = {

    listenToNearbyTrees: function(latLng, enterCallback, exitCallback) {

        // Create a new GeoFire instance at the random Firebase location
        var geoFire = new geofire.GeoFire(firebase.database().ref().child("geo"));

        var geoQuery = geoFire.query({
            center: latLng,
            radius: 50
        });

        //todo - those listeners have to be somewhere else.
        var onReadyRegistration = geoQuery.on("ready", function() {
            console.log("GeoQuery has loaded and fired all other events for initial data");
        });

        var onKeyEnteredRegistration = geoQuery.on("key_entered", enterCallback);

        var onKeyExitedRegistration = geoQuery.on("key_exited",exitCallback);

        var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, location, distance) {
            console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
        });

        return geoQuery;
    }

};
