'use strict';



const app = require('./server');
const chalk = require('chalk');

const _Port = 3001;

app.listen(_Port, () => console.log(chalk.magenta(`Staged Fright in now runnig on port ${_Port}`)));
