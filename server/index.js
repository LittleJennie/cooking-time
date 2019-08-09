const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./Router');

const app = express();

app.use(morgan('dev'));
app.set('port', 3000);

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use('/', router);

app.listen(app.get('port'));
console.log(`Now listening to port ${app.get('port')}`);
