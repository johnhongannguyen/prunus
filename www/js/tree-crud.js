
var treeCRUD = {

    //latLng -> [-123,321])
    write: function(file, rating, latLng, callback) {

        //Firebase location for storing coodinates of trees:
        var firebaseRef = firebase.database().ref().child("geo");

        //We need a key ID for the geofire object:
        var randomKeyId = firebase.database().ref().push().key; //This simply creates a random key.

        // Create a new GeoFire instance at the Firebase location:
        var geoFire = new geofire.GeoFire(firebaseRef);



        addFileFirebase(randomKeyId, file, function(downloadURL){

            console.log("downloadURL = " + downloadURL);

            //Writes the geoFire object in firebase:
            geoFire.set(randomKeyId, latLng)
            .then(function() {
                console.log("Provided key has been added to GeoFire");

                // Writes the tree object inside the geoFire object:
                var newTreeRef = firebaseRef.child(randomKeyId + "/tree")

                .set({
                    img_url: downloadURL,
                    rating: rating,
                });
            });
        });


    }

}

function addFileFirebase(name, file, callback) {

    var the_file = dataURLtoFile(file);


    //Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'images/name.jpg'
    var fileRef = storageRef.child('images/' + "tree" + name + '.jpeg');

    fileRef.put(the_file).then(
        function(snapshot) {

            console.log("success!!!");

            snapshot.ref.getDownloadURL().then(callback);
        },

        function(error){
            console.log("fail");
        }
    );

}


function dataURLtoFile(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}










//.
