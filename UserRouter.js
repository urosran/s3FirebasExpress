const express = require('express')
const router = express.Router();
const upload = require('./s3.js')
const Fire = require('./firebase.js')
var multer = require('multer');

const fire = new Fire()

router.route('/').get(function (req, res) {
    res.send('yaay ')
})

router.route('/issues').get(async function (req, res) {
    return res.send(await fire.getAllIssues());
})
// issueType, reporterData, imgUrl, zip, status, coords
router.route('/addissue').post(upload.single('image'),  function(req, res, err){
    if (err instanceof multer.MulterError){
        // console.log("multer err", err)
    } else if(err){
        // console.log("s3 errr:", err)
    }
    fire.addIssue(
        req.body.issueType, 
        req.body.reporterData, 
        req.file.location, 
        req.body.zip, 
        req.body.status, 
        req.body.coords)
    res.send(req.body.issueType, 
        req.body.reporterData, 
        req.file.location, 
        req.body.zip, 
        req.body.status, 
        req.body.coords)
})

module.exports = router;
