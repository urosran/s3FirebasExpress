require('dotenv').config();
const fs = require('fs')

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
var s3 = new AWS.S3()

class Storage{
    uploadImage(localImage, imageRemoteName){
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
                return s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })
            })
            .catch(err => {
                console.log('failed:', err)
                return 404
        })
    }
}
        
module.exports = Storage;