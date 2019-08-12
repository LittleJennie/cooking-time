const upload = require('../services/s3ImgUpload');

const multipleUpload = upload.array('recipePic');

module.exports = (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{
          title: 'File Upload Error',
          detail: err.message,
        }],
      });
    }
    
    const filesLocation = [];

    for (let i = 0; i < req.files.length; i ++) {
      filesLocation.push(req.files[i].location);
    }
    
    return res.status(201).json({ 'imageUrl': filesLocation });
  });
};
