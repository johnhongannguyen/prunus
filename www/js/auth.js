var auth = {

    loginWithGoogle: function() {

        app.preloader.show();

        window.plugins.googleplus.login(
            {
              //...
            },
            function (obj) {
                // Success! Get token and user data in obj
                app.preloader.hide();
                console.log(JSON.stringify(obj));
            },
            function (msg) {
                //Error
                app.preloader.hide();
                console.log('error: ' + msg);
            }
        );

    },
    

    loginWithFacebook: function() {

        app.preloader.show();

        facebookConnectPlugin.login(["public_profile", "email"], function(result){
            //success:
            //{"status":"connected","authResponse":{"accessToken":"xxx","expiresIn":"5162703","session_key":true,"sig":"...","userID":"10218661088096462"}}
            console.log(JSON.stringify(result));


            //Get user data:
            facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile", "email"], function(userData){

                app.preloader.hide();

                //success
                console.log(JSON.stringify(userData));
            }, function(error){

                app.preloader.hide();

                //error
                console.log(JSON.stringify(error));
            });


        }, function(error){

            app.preloader.hide();

            //error
            console.log(JSON.stringify(error));
        });

    }
}










//.
