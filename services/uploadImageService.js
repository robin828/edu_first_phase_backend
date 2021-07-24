const app = require('express')();
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

const s3_Question = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.S3_BUCKET_NAME
   });

exports.upload = multer({
    storage: multerS3({
        s3: s3_Question,
        bucket: 'S3_BUCKET_NAME',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})