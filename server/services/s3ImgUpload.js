const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const credential = require('../../awsCredential');

AWS.config.update({
    region:'us-west-1',
    accessKeyId: credential.ACCESSKEYID,
    secretAccessKey: credential.SECRETACCESSKEY,
});

const s3 = new AWS.S3();
const S3_BUCKET = credential.BUCKET;

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: S3_BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  }),
});

module.exports = upload;
