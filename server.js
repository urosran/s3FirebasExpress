const express = require('express');
const app = express();
const AWS = require('./s3.js')
const Fire = require('./firebase.js')
// const storage = new AWS()

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.get('/issues', function (req, res) {
    return res.send('Hello world');
   });
app.get('/uploadissue', function (req, res) {
    const storage = new AWS();
    const fire = new Fire(zipCode=12220);
    fire.addIssue(
        1, 
        "uros", 
        storage.uploadImage("./test.png", "uors.png"),
        "not started"
    )
    return res.send("maybe baby")
    
});


app.listen(process.env.PORT || 8080, function(){
    console.log("App listening on port 8080")
});