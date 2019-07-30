require('dotenv').config();
const fs = require('fs')
var multer = require('multer');
var multerS3 = require('multer-s3');

const AWS = require('aws-sdk')
const BUCKET = process.env.BUCKET
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY
const REGION = process.env.REGION

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION
})
var multer = require('multer');
var multerS3 = require('multer-s3');

var s3 = new AWS.S3();

// Multer upload (Use multer-s3 to save directly to AWS instead of locally)
var upload = multer({
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
      },
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        // Set public read permissions
        acl: 'public-read',
        // Auto detect contet type
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        // Set key/ filename as original uploaded name
        key: function (req, file, cb) {
        cb(null, file.originalname)
        }
    })

})
      
module.exports = upload;