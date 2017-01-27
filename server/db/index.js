'use strict';

import db from './db';
import chalk from 'chalk';

import Tables from './models';

// The exported function that takes a param as to whether or not to sync the db.
export default (sync = false) => {
  return db.sync({force: sync})
    // .then(() => {
    //   if (sync) console.log(chalk.cyan('Rick, that was brutal! (Force Sync Complete)'));
    //   else console.log(chalk.green('Hey, Morty, I got the hardest working models in the universe - try not to ruin it, alright Morty? (Your Models Have Been Synced)'));
    // })
    .catch((err) => console.error(err));
};
