'use strict';

import myServer from './server';

import HTTP from 'http';
import startDB from './server/db';
import chalk from 'chalk';

const server = HTTP.createServer();
const _Port = 3001;

startDB()
  .then(() => server.on('request', myServer))
  .catch(err => console.error(err))
  .finally(() => server.listen(_Port, () => console.log(chalk.magenta(`Meme magic has begun on Port ${_Port}`))));
