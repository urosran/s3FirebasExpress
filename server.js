const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = require('./UserRouter')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router)

app.use('/issues', router)
app.use('/addissue', router)
// app.use('/', router)

app.listen(process.env.PORT, function(){
    console.log("App listening on", process.env.PORT)
});

