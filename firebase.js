
require('dotenv').config();
// FIREBASE Config

class Fire{
    constructor(zipCode){
        var firebase = require('firebase');
        this.firebaseConfig = {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            databaseURL: process.env.databaseURL,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId
          };
        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);
        this.ref = firebase.app().database().ref("/issues/"+zipCode);
    }
    getAllIssuesForZipCode(){
        // fetch the entire issue tree
        this.ref.once('value')
         .then(function (snap) {
         console.log(snap.val());
         });
    }

    getAllIssues(){
        this.ref = firebase.app().database().ref("/issues/");
    }

    addIssue(issueType, reporterData, imgUrl, status){
        issueId = Date.now()
        this.ref.push({issueId: {
            "issueType": issueType,
            "reporterData": reporterData,
            "imgUrl": imgUrl, 
            "status": status
        }})
    }

}

module.exports = Fire;