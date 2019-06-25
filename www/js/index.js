var $$ = Dom7;


class Tree {
    constructor(img, lat, lng, address, blooming, rating, user) {
        this.img_url = img;
        this.lat = lat;
        this.lng = lng;

        this.address = address;

        this.blooming = blooming;
        this.rating = rating;
        this.user = user


    }
}

class User {
    constructor(uid, photoURL, displayName) {
        this.uid = uid;
        this.photoURL = photoURL;
        this.displayName = displayName;
    }
}

//Use this to open new pages in the app.
var appNavigator = {

    openPageAddTree: function(src, lat, lng) {

        var options = {
            context: {
                tree: new Tree(src, lat, lng),
            }
        };

        mainView.router.navigate('/add-tree/', options);

    },

    openPageViewTree: function(key) {

        var options = {
            context: {
                key: key,
            }
        };

        mainView.router.navigate('/view-tree/', options);
    },

    openPageLogin: function() {

        mainView.router.navigate('/login/');
    },

    openPageProfile: function() {

        mainView.router.navigate('/profile/');
    },

    //Call this to close a page.
    onBackPressed:function(){

        if(mainView.history.length == 2){

            // When coming back from third page navigation... Index content becomes blank.
            // So in that case we are force-reloading the index.
            if($("#app .page").html().trim() == ''){
                mainView.router.back();

                location.reload(true);
                return;
            }
        }


        if(mainView.history.length > 1){
            mainView.router.back();
        }else{
            navigator.app.exitApp();
        }
    }
};

var appConfig = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();

        initializeFramework7();

    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    onDeviceReady: function() {

        appConfig.receivedEvent('deviceready');

        // Adds the initialization code in the init-preferences div:
        $("#init-preferences").load("init-preferences.html");

        document.addEventListener("backbutton", appNavigator.onBackPressed, false);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    },

    onFirebaseInitialized: function() {

        console.log('Firebase initialized');

    },

    onFirebaseDatabaseInitialized: function() {

        console.log('Firebase database initialized');
        auth.init();
    }
};

var app;
var mainView;

function initializeFramework7(){
    // Framework7 App main instance
    app  = new Framework7({
        root: '#app', // App root element

        theme: 'auto', // Automatic theme detection

        // App routes
        routes: routes
    });

    // Init/Create main view
    mainView = app.views.create('.view-main', {
        url: '/'
    });
}
