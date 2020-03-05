const express = require('express');
const app = express();

app.use(require('./auth-jwt'));
app.use(require('./data'));

module.exports = app;
