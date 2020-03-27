// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyBYT6m9DxhHDGwPCggZxvCGy-Nn1x6y-6c",
    authDomain: "findmylost-5250f.firebaseapp.com",
    databaseURL: "https://findmylost-5250f.firebaseio.com",
    projectId: "findmylost-5250f",
    storageBucket: "findmylost-5250f.appspot.com",
    messagingSenderId: "810726371318",
    appId: "1:810726371318:web:7c93cd501eadab3a6161d7",
    measurementId: "G-9MTTLS7R7P"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
