require('dotenv').config();
// FIREBASE Config

class Fire {
    constructor() {
        this.firebase = require('firebase');
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
        this.firebase.initializeApp(this.firebaseConfig);
    }
    getAllIssuesForZipCode(zipCode) {
        // fetch the entire issue tree
        this.ref = this.firebase.app().database().ref("/issues/" + zipCode);
        this.ref.once('value')
            .then(function (snap) {
                console.log(snap.val());
            }).then(function (allResults) {
                console.log("all results", allResults)
            });
    }

    getAllIssues() {
        this.ref = this.firebase.app().database().ref("/issues");
        var snapStore = undefined
        // this.ref.once('value')
        // .then(function (snap) {
        // console.log(snap.val());
        // snapStore = snap.val()
        // }); 
        // console.log("snap", snapStore)

        return this.firebase.app().database().ref('/issues/').once('value')
            .then(function (snapshot) {
                console.log("undef", snapStore)
                snapStore = (snapshot.val())
                console.log("def", snapStore)
                return snapStore
            });
    }

    async addIssue(issueType, reporterData, imgUrl, zip, status, coords) {
        var issueId = Date.now()
        this.ref = this.firebase.app().database().ref("/issues/" + zip)
        var issue = {
            [issueId]: {
                "issueType": issueType,
                "reporterData": reporterData,
                "imgUrl": imgUrl,
                "coords": coords,
                "status": status
            }
        } 
        console.log(issue)
        this.ref.push({
            issue
        })
    }

}

module.exports = Fire;