var $$ = Dom7;



//Used to pass the picture src to the add-tree page.
var tree;
var id;

class Tree {
    constructor(img, lat, lng, blooming, rating) {
          this.img_url = img;
          this.lat = lat;
          this.lng = lng;
          this.blooming = blooming;
          this.rating = rating;
          this.ratingCheck = function(ratingVal) {
            return ratingVal == this.rating;
          }
    }
}





//Use this to open new pages in the app.
//It holds a list of pages that are loaded in the main .app div.
var appNavigator = {

    openPageAddTree: function(src, lat, lng) {

        //Coordinates are stored in map.js (Will only work if it is active!!!)
        tree = new Tree(src, lat, lng);
        mainView.router.navigate('/add-tree/');

    },

    openPageViewTree: function(key) {
        id = key
        mainView.router.navigate('/view-tree/');
    },

    //Call this to close a page.
    onBackPressed:function(){

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
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
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

        //Code to add mock trees:

        // treeCRUD.write("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/view-of-cherry-blossom-trees-on-road-royalty-free-image-957939640-1553531944.jpg?crop=0.563xw:1.00xh;0.229xw,0&resize=640:*",
        //  1, [49.2212886,-123.10285560000001]);
        //
        //  treeCRUD.write("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/view-of-cherry-blossom-trees-on-road-royalty-free-image-957939640-1553531944.jpg?crop=0.563xw:1.00xh;0.229xw,0&resize=640:*",
        //   3, [49.251785, -123.155283]);
        //
        //   treeCRUD.write("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/view-of-cherry-blossom-trees-on-road-royalty-free-image-957939640-1553531944.jpg?crop=0.563xw:1.00xh;0.229xw,0&resize=640:*",
        //    5, [49.240466, -123.148327]);
        //
        //    treeCRUD.write("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/view-of-cherry-blossom-trees-on-road-royalty-free-image-957939640-1553531944.jpg?crop=0.563xw:1.00xh;0.229xw,0&resize=640:*",
        //     4, [49.231820, -123.159276]);
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
