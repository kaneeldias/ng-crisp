export const firebase = require("firebase");
firebase.initializeApp({
    apiKey: "AIzaSyAx-CruENboleH10nJrf46zMoM9rWVNvFA",
    authDomain: "test-c4d27.firebaseapp.com",
    databaseURL: "https://test-c4d27.firebaseio.com",
    projectId: "test-c4d27",
    storageBucket: "test-c4d27.appspot.com",
    messagingSenderId: "269313518823"
});

export const db = firebase.firestore();
