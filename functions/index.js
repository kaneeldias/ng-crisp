const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Firebase Admin SDK to access the Firebase Realtime Database.
const firebase = require("firebase");
var admin = require('firebase-admin');
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp({
    apiKey: "AIzaSyAx-CruENboleH10nJrf46zMoM9rWVNvFA",
    authDomain: "test-c4d27.firebaseapp.com",
    databaseURL: "https://test-c4d27.firebaseio.com",
    projectId: "test-c4d27",
    storageBucket: "test-c4d27.appspot.com",
    messagingSenderId: "269313518823"
});
var db = firebase.firestore();


exports.calcWeekConversationsCreated = functions.https.onRequest((req, res) => {
    var weeks = {};
    var weeks_list = [];
    var total = 0;
    var count = 0;
    db.collection('conversations').get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var created_at_mon = getCreatedWeek(doc.created_at);
                if (weeks[created_at_mon] === undefined) {
                    count++;
                    weeks_list.push(created_at_mon);
                    weeks[created_at_mon] = 0;
                }
                total++;
                weeks[created_at_mon]++;
            });

            var c = 0;
            weeks_list.forEach(function (week) {
                db.collection('main-record').doc(week).set({ 'conversations_created': weeks[week] }, { merge: true })
                    .then(
                        function () {
                            c++;
                            if (c === count) {
                                var obj = {};
                                obj.total = total;
                                obj.week = weeks;
                                //print(weeks);
                                //console.log("total: " + total);
                                res.status(200).json(obj);
                            }
                            return true;
                        },
                        function () {
                            throw new Error("error");
                        }
                    ).catch(function (error) {
                        console.log(error);
                    })
            })
            return null;
        }).catch(function (error) {
            console.log(error);
            process.exit(1);
        })
});

/*exports.onConversationWrite = functions.firestore
    .document('conversations/{conversation_id}')
    .onWrite((change, context) => {
        var before, after;

        //new conversation added
        if (change.before.data() === undefined) {
            week = getCreatedWeek(change.after.data().created_at);
            console.log("created conversation on" + week);
            db.collection('main-record').doc(week).set({'conversations_created': firebase.firestore.FieldValue.increment(1)}, {merge:true});
            /*week = getCreatedWeek(change.after.data().created_at);
            ref = firebase.database().ref('main-record/'+week+'/conversations_created');    
            ref.transaction(function(count) {   
                return count + 1;
            });
        }
        if (change.after.data() === undefined){
            week = getCreatedWeek(change.before.data().created_at);
            console.log("deleted conversation on " + week);
            db.collection('main-record').doc(week).set({'conversations_created': firebase.firestore.FieldValue.increment(-1)}, {merge:true});
            /*week = getCreatedWeek(change.before.data().created_at);
            ref = firebase.database().ref('main-record/'+week+'/conversations_created');    
            ref.transaction(function(count) {   
                return count - 1;
            });
        }

        return;

    });*/

exports.resetConversationsCreated = functions.https.onRequest((req, res) => {
    db.collection('main-record').get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            db.collection('main-record').doc(doc.id).set({conversations_created: 0}, {merge:true});
        })
        return;
    }).catch(function(error){
        console.log(error);
    })
});

getCreatedWeek = function (date) {
    date = date.split(" ")[0];
    var d = new Date(date);
    var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    var create_week = new Date(d.setDate(diff)).toISOString().split("T")[0];
    return create_week;
}