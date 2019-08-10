const upload = require('../services/s3ImgUpload');

const singleUpload = upload.single('recipePic');

module.exports = (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).send({
        errors: [{
          title: 'File Upload Error',
          detail: err.message,
        }],
      });
    }

    return res.json({ 'imageUrl': req.file.location });
  });
};
