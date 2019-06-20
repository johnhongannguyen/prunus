
var auth = {

    init: function() {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    },

    //Use this to listen to login changes on pages:
    /*
    auth.setLoginListener(function(user) {

        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
    */
    setLoginListener: function (listener) {

        //Listens to user login/logout from Firebase:
        firebase.auth().onAuthStateChanged(listener);
    },

    //Gets the user token and data from Google, then proceeds to login on Firebase
    loginWithGoogle: function() {


        window.plugins.googleplus.login(
            {
                //...
            },
            function (obj) {
                // Success! Get token and user data in obj

                console.log(JSON.stringify(obj));
                auth.firebaseGoogleLogin(obj);
            },
            function (msg) {
                //Error
                console.log('error: ' + msg);
            }
        );

    },


    //Gets the user token and data from Facebook, then proceeds to login on Firebase
    loginWithFacebook: function() {


        facebookConnectPlugin.login(["public_profile", "email"], function(result){
            //success:
            console.log(JSON.stringify(result));

            //Get user data:
            facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile", "email"], function(userData){

                //success
                //{"email":"xxx","name":"xxx","picture":{"data":{"height":50,"is_silhouette":false,"url":"xxx","width":50}},"id":"xxx"}
                auth.firebaseFacebookLogin(result.authResponse.accessToken, userData);

                console.log(JSON.stringify(userData));
            }, function(error){


                //error
                console.log(JSON.stringify(error));
            });


        }, function(error){


            //error
            console.log(JSON.stringify(error));
        });

    },

    logout: function(){

        firebase.auth().signOut().then(function(){
        });
    },




    //--------------------------------------------------------------------------
    //Private methods:
    //--------------------------------------------------------------------------

    // Signs the user in Firebase, using the Facebook token:
    firebaseFacebookLogin: function (fbToken, userData){

        // https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider.html#static-credential
        var credential = firebase.auth.FacebookAuthProvider.credential(fbToken);

        // Sign in with the credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).then(function(user){

            console.log("Signed into Firebase with the Facebook token.");

        }, function(error) {

            console.log("Something went wrong Firebase-Facebook");
            console.log(JSON.stringify(error));


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
    firebaseGoogleLogin: function (googleResponse){

        //https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#static-credential
        var credential = firebase.auth.GoogleAuthProvider.credential(null, googleResponse.accessToken);

        firebase.auth().signInWithCredential(credential).then(function(user){

            console.log("Signed into Firebase with the Google token.");

        }, function(error) {

            console.log("Something went wrong Firebase-Google");
            console.log(JSON.stringify(error));


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
