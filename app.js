'use strict';

import app from './server';
import chalk from 'chalk';

const _Port = 3001;

app.listen(_Port, () => console.log(chalk.magenta(`Staged Fright in now runnig on port ${_Port}`)));
