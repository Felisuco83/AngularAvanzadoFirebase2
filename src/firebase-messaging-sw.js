importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js")

firebase.initializeApp({
    apiKey: "AIzaSyB8V7wGCdsG6qTFYDl5KIaMDN2PEtD-NaI",
    authDomain: "listadoreordenable-e63e3.firebaseapp.com",
    projectId: "listadoreordenable-e63e3",
    storageBucket: "listadoreordenable-e63e3.appspot.com",
    messagingSenderId: "449487119420",
    appId: "1:449487119420:web:909c2ba5b91ca2a3614f39"
});

const messaging = firebase.messaging();
