



/*
--------------------------------------------------------------------------------
registerCurrentUser
getUserData
--------------------------------------------------------------------------------
*/

var userCRUD = {

    // callback(error); //-> If error exists... otherwise its a success
    registerCurrentUser: function(callback) {

        userCRUD.getUserData(

            // callback(error); //-> If error exists... otherwise its a success
            function(user){

                if(user){

                    //If exists then do nothing.
                    console.log("User exists. No further action needed.");
                    callback();

                } else {

                    //If dosent exist, then register on realtime database
                    console.log("User does not exist. proceed to register...");

                    var user = firebase.auth().currentUser

                    //Firebase location for storing coodinates of trees:
                    var firebaseRef = firebase.database().ref().child("users/" + user.uid);


                    var newUser = new User(user.uid, user.photoURL, user.displayName)

                    firebaseRef.set(newUser, function(error){
                        if(error){
                            console.log(JSON.stringify(error));
                            callback(error);
                        }else{
                            console.log("User registered.");
                            callback();
                        }

                    });
                }

            });

        },


        // callback(user); //-> If user exists... otherwise it dosent
        getUserData: function (callback) {

            var user = firebase.auth().currentUser

            firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                var result = snapshot.val();

                callback(result);
            });
        },

        addTreeToFavorites: function(user, treeID, callback) {
            console.log("In UserCRUD->addTreeToFavorites")
            // console.log(JSON.stringify(user))
            // console.log(JSON.stringify(tree))

            // Apparently the only way to name a JSON key from a variable's value
            // Ref: https://stackoverflow.com/questions/13833204/how-to-set-a-js-object-property-name-from-a-variable
            var treeKey = {};
            for(var i=1; i <= 1; i++) {
                treeKey[treeID] = true;        
            }

            // Firebase location for storing users:
            var firebaseRef = firebase.database().ref().child("users");

            // Add a reference to the Tree object inside the User's favorite tree list
            var treeRef = firebaseRef.child(user.uid + "/favorites")
                .update(
                    treeKey
                    , callback);
        },

        removeTreeFromFavorites: function(user, treeID, callback) {
            console.log("In UserCRUD->removeTreeFromFavorites")
            
            // Firebase location for storing users:
            var firebaseRef = firebase.database().ref().child("users");

            // Remove a Tree object reference from the User's favorite tree list
            var treeRef = firebaseRef.child(user.uid + "/favorites/" + treeID)
            treeRef.remove()
                .then(function() {
                    console.log("Remove succeeded.")
                })
                .catch(function(error) {
                    console.log("Remove failed: " + error.message)
                });
        }
    }
