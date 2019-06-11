/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
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
