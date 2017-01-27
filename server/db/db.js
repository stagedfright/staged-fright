'use strict';

import path from 'path';
import chalk from 'chalk';
import Sequelize from 'sequelize';

const ourDB = 'staged-fright';

//console.log(chalk.yellow('Hey Rick!'));

const _db = new Sequelize(ourDB, null, null, {host: 'localhost', logging: false, dialect: 'postgres', native: true});

export default _db;
