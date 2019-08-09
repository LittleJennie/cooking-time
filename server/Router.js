const express = require('express');
const createForm = require('./Model/createForm');

const router = express.Router();

router.post('/createRecipe', createForm);

module.exports = router;
