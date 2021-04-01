const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
  /*on("file:preprocessor", cypressTypeScriptPreprocessor);
  return cypressFirebasePlugin(config)*/
};



/*
* TODO: We are like half way done with Cypress-firebase
*  - We need auth to work.
*  - https://github.com/prescottprue/cypress-firebase#auth
*  - Refer to Yami
*  - Need to add "CYPRESS_TEST_UID"
* */
