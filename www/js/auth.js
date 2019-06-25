

/*
*  Flow:
*   1. Login with Google/Facebook directly (To get the token).
*   2. Then signs in with the token on Firebase.
*   3. Upon success, checks if the user exists in the database (userCRUD object).
*   4. If it exists, falls back with success.
*   4. If it dosen't exist, then will create the user in the database.
*/

/*
--------------------------------------------------------------------------------
setLoginListener
loginWithGoogle
loginWithFacebook
getCurrentUser
logout
--------------------------------------------------------------------------------
*/
var auth = {

    //Call this on device ready
    init: function() {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    },

    getCurrentUser: function(){

        var userF = firebase.auth().currentUser

        if(userF){
            return new User(userF.uid, userF.photoURL, userF.displayName);
        }

        return null;
    },

    logout: function(){

        firebase.auth().signOut().then(function(){
        });
    },

    //Use this to listen to login changes on pages: (Example is below the function)
    //listener(user) -> if user exists, then its signed in.
    setLoginListener: function (listener) {

        //Listens to user login/logout from Firebase:
        firebase.auth().onAuthStateChanged(listener);
    },

    //Gets the user token and data from Google, then proceeds to login on Firebase
    // callback(error); //-> If error exists... otherwise its a success
    loginWithGoogle: function(callback) {

        window.plugins.googleplus.login(
            {
                //...
            },
            function (obj) {
                // Success! Get token and user data in obj

                console.log(JSON.stringify(obj));
                auth.firebaseGoogleLogin(obj, callback);
            },
            function (msg) {
                //Error
                console.log('error: ' + msg);
            }
        );

    },


    //Gets the user token and data from Facebook, then proceeds to login on Firebase
    // callback(error); //-> If error exists... otherwise its a success
    loginWithFacebook: function(callback) {

        facebookConnectPlugin.login(["public_profile", "email"], function(result){

            //success:
            console.log(JSON.stringify(result));
            auth.firebaseFacebookLogin(result.authResponse.accessToken, callback);

            //Get user data directly from facebook:
            // facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile", "email"], function(userData){
            //
            //     //success
            //     //{"email":"xxx","name":"xxx","picture":{"data":{"height":50,"is_silhouette":false,"url":"xxx","width":50}},"id":"xxx"}
            //
            //     console.log(JSON.stringify(userData));
            //
            // }, function(error){
            //
            //
            //     //error
            //     console.log(JSON.stringify(error));
            // });


        }, function(error){

            //error
            console.log(JSON.stringify(error));
        });

    },


    //--------------------------------------------------------------------------
    //Private methods:
    //--------------------------------------------------------------------------

    // Signs the user in Firebase, using the Facebook token:
    firebaseFacebookLogin: function (fbToken, callback){

        // https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider.html#static-credential
        var credential = firebase.auth.FacebookAuthProvider.credential(fbToken);

        // Sign in with the credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).then(function(user){

            console.log("Signed into Firebase with the Facebook token.");

            userCRUD.registerCurrentUser(function(error){

                //If there was an error registering, then logs the user out:
                if(error){
                    auth.logout();
                    callback(error)
                }else{

                    //Otherwise proceed with success callback:
                    callback();
                }
            });

        }, function(error) {

            console.log("Something went wrong Firebase-Facebook");
            console.log(JSON.stringify(error));
            callback(error);


            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    },

    // Signs the user in Firebase, using the Google token:
    firebaseGoogleLogin: function (googleResponse, callback){

        //https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#static-credential
        var credential = firebase.auth.GoogleAuthProvider.credential(null, googleResponse.accessToken);

        firebase.auth().signInWithCredential(credential).then(function(user){

            console.log("Signed into Firebase with the Google token.");

            userCRUD.registerCurrentUser(function(error){

                //If there was an error registering, then logs the user out:
                if(error){
                    auth.logout();
                    callback(error)
                }else{

                    //Otherwise proceed with success callback:
                    callback();
                }
            });


        }, function(error) {

            console.log("Something went wrong Firebase-Google");
            console.log(JSON.stringify(error));
            callback(error);


            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    },
}




//.
