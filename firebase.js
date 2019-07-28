require('dotenv').config();
// FIREBASE Config

class Fire{
    constructor(){
        this.firebase = require('firebase');
        this.firebaseConfig = {
            // apiKey: "AIzaSyBoaH9huGPD_ab8dtp1bu0uX8okD7z3Eso",
            // authDomain: "cityapp-858ea.firebaseapp.com",
            // databaseURL: "https://cityapp-858ea.firebaseio.com",
            // projectId: "cityapp-858ea",
            // storageBucket: "cityapp-858ea.appspot.com",
            // messagingSenderId: "649846420860",
            // appId: "1:649846420860:web:2366b9c7a86f1e69",
                        
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            databaseURL: process.env.databaseURL,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId
          };
        // Initialize Firebase
        this.firebase.initializeApp(this.firebaseConfig);
    }
    getAllIssuesForZipCode(zipCode){
        // fetch the entire issue tree
        this.ref = this.firebase.app().database().ref("/issues/"+zipCode);        
        this.ref.once('value')
         .then(function (snap) {
         console.log(snap.val());
         }).then(function(allResults){
             console.log("all results", allResults)
         });
    }

    getAllIssues(){
        this.ref = this.firebase.app().database().ref("/issues");
       var snapStore = undefined
        // this.ref.once('value')
        // .then(function (snap) {
        // console.log(snap.val());
        // snapStore = snap.val()
        // }); 
        // console.log("snap", snapStore)

       return this.firebase.app().database().ref('/issues/').once('value')
        .then(function(snapshot) {
            console.log("undef", snapStore)
            snapStore = (snapshot.val())
            console.log("def", snapStore)
            return snapStore
        });
        
        
    }

    addIssue(issueType, reporterData, imgUrl, coords, status){
        issueId = Date.now()
        this.ref = this.firebase.app().database().ref("/issues/" + coords.zip)
        this.ref.push({issueId: {
            "issueType": issueType,
            "reporterData": reporterData,
            "imgUrl": imgUrl,
            "coords": coords, 
            "status": status
        }})
    }

}

module.exports = Fire;