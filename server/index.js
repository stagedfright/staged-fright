'use strict';

import express from 'express';
import chalk from 'chalk';
import configServer from './configure';
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

export default app;
