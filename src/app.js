'use strict';



const app = require('./server');
const chalk = require('chalk');

const _Port = 3001;

var server = app.listen(_Port, () => console.log(chalk.magenta(`StagedFright is now running on port ${_Port}`)));

module.exports = server;
