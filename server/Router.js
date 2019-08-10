const express = require('express');
const createRecipe = require('./Model/createRecipe');
const uploadImage = require('./Model/uploadImage');

const router = express.Router();

router.post('/createRecipe', createRecipe);
router.post('/uploadImage', uploadImage);

module.exports = router;
