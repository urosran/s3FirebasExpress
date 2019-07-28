
require('dotenv').config();
const express = require('express');
const multer = require('multer');
var firebase = require('firebase');
var AWS = require('aws-sdk')
const fs = require('fs')
// FIREBASE Config
var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };
// AWS Config
const BUCKET = process.env.BUCKET
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY
const REGION = process.env.REGION

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

const localImage = './test.png'
const imageRemoteName = `catImage_${new Date().getTime()}.png`
var s3 = new AWS.S3()

s3.putObject({
  Bucket: BUCKET,
  Body: fs.readFileSync(localImage),
  Key: imageRemoteName
})
  .promise()
  .then(response => {
    console.log(`done! - `, response)
    console.log(
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
    )
  })
  .catch(err => {
    console.log('failed:', err)
  })

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ref = firebase.app().database().ref("/issues");

// fetch the entire issue tree
ref.once('value')
 .then(function (snap) {
 console.log(snap.val());
 });

ref.push({issue1: "uros"})
