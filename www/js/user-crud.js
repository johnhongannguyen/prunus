



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
    }
