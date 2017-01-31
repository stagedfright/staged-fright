##Staged Fright

This builds off of Eliot's React/Aframe boilerplate, Meme Magic.

  Set up:

    1. $ createdb staged-fright (just for the first time, obvs)

    2. Make a `secrets.js` file in the root directory.
      (Also just to start; the secrets file is already in the .gitignore)

      It should contain:

        export default {
          SessionKey: 'WhateverYouWant'
        };


    3. $ npm install
    4. $ npm start
    5. go to localhost:3001
