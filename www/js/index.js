
//Use this to open new pages in the app.
//It holds a list of pages that are loaded in the main .app div.
var appNavigator = {
    pagesStack : [],
    pagesStackListeners : [],

    //Use this method to open a new page for the app:
    loadPage: function(fileName, onPageLoadListener) {

        $(".log").append(fileName);


        appNavigator.pagesStack.push(fileName);
        appNavigator.pagesStackListeners.push(onPageLoadListener);

        $(".app").load(fileName, onPageLoadListener);
    },

    onBackPressed:function(onPageLoadListener){

        $(".log").append("back " + appNavigator.pagesStack.length);

        if(appNavigator.pagesStack.length == 1){

            navigator.app.exitApp();

        } else {

            appNavigator.pagesStack.pop();
            appNavigator.pagesStackListeners.pop();

            $(".app").load(appNavigator.pagesStack[appNavigator.pagesStack.length - 1], appNavigator.pagesStackListeners[appNavigator.pagesStack.length - 1], onPageLoadListener);
        }
    }

};



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
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

        app.receivedEvent('deviceready');

        // Adds the initialization code in the init-preferences div:
        $("#init-preferences").load("init-preferences.html");


        document.addEventListener("backbutton", appNavigator.onBackPressed);
        // document.addEventListener("backbutton", function(e){
        //
        // }, false);

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
