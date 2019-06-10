var treeCRUD = {

    //latLng -> [-123,321])
    write: function(img_url, rating, latLng) {

        //Firebase location for storing coodinates of trees:
        var firebaseRef = firebase.database().ref().child("geo");

        //We need a key ID for the geofire object:
        var randomKeyId = firebase.database().ref().push().key; //This simply creates a random key.

        // Create a new GeoFire instance at the Firebase location:
        var geoFire = new geofire.GeoFire(firebaseRef);

        //Writes the geoFire object in firebase:
        geoFire.set(randomKeyId, latLng).then(function() {
            console.log("Provided key has been added to GeoFire");

            // Writes the tree object inside the geoFire object:
            var newTreeRef = firebaseRef.child(randomKeyId + "/tree").set({
                img_url: img_url,
                rating: rating,
            });

        }, function(error) {
            console.log("Error: " + error);
        });

    }

};
