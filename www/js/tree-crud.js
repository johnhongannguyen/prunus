
var treeCRUD = {

    //img, [latlng], address, blooming, rating, user
    //latLng -> [-123,321])
    write: function(file, latLng, address, blooming, rating, user, callback) {

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


                //Now we save the tree object in the geo node, AND
                //save the tree to the USER node at the same time:

                var updates = {};

                //Tree to the geo node:
                updates['/geo/' + randomKeyId + "/tree"] = {
                    img_url: downloadURL,
                    rating: rating,
                    blooming: blooming,
                    address: address,
                    user: user
                };

                //Tree to the user node:
                updates['/users/' + user.uid + "/trees/" + randomKeyId] = {
                    img_url: downloadURL,
                    rating: rating,
                    blooming: blooming,
                    address: address
                }

                //saving:
                firebase.database().ref().update(updates, callback);
            });
        });


    },

    read: function(key, user, callback) {
        //Fetch and return GeoFire object from Firebase
        firebase.database().ref('/geo/' + key).once('value').then(function(snapshot) {

            var result = snapshot.val();
            var resultTree = new Tree(  result.tree.img_url,
                result.l[0],
                result.l[1],
                result.tree.address,
                result.tree.blooming,
                result.tree.rating);

            // Check if tree exists in user's favorite trees
            if (user != null) {
                treeCRUD.isFavorite(user.uid, key, function(isFav) {
                    callback(resultTree, isFav)
                })
            } else {
                callback(resultTree, false)
            }
        });
    },

    readBloom: function(key, callback) {
        //Fetch and return Tree's Blooming from Firebase
        firebase.database().ref('/geo/' + key).once('value').then(function(snapshot) {
            // console.log(JSON.stringify(snapshot.val()))

            if (auth.getCurrentUser() != null) {

                // "In life, some things just can't be explained. But they simply work!"
                //                   - Pratt (a really, really terrible and disgraceful programmer)
                
                treeCRUD.isFavorite(auth.getCurrentUser().uid, key, function(isFav, cb, bloom) {
                    cb(isFav ? isFav : bloom)
                }, callback, snapshot.val().tree ? snapshot.val().tree.blooming : null)
            } else {
                callback(snapshot.val().tree ? snapshot.val().tree.blooming : null)
            }
        })
    },

    isFavorite: function(uid, key, callback, parentCallback, bloom) {
        firebase.database().ref('/users/' + uid + '/favorites/' + key).once('value').then(function(isFavorite) {
            callback(isFavorite.val(), parentCallback, bloom)
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
