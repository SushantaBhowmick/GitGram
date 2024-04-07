const multer = require('multer');
const dotenv = require("dotenv");

const { S3Client } = require("@aws-sdk/client-s3");
dotenv.config();

const multerS3 = require('multer-s3')

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY
  },
  region: "ap-south-1"
})


const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    const fileKey = `${Date.now()}-${file.originalname}`;
    cb(null, fileKey)
  }
})
  

  const upload = multer({
    storage: storage
  }); 
  
  const uploadMiddleWare = upload

  module.exports = uploadMiddleWare
 
  
