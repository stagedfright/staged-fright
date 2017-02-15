'use strict';

const express = require('express');
const chalk = require('chalk');
const configServer = require('./configure');
const app = express();
configServer(app);


app.get('/*', (req, res) => {
  res.sendFile(app.getValue('indexPath'));
});

app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
