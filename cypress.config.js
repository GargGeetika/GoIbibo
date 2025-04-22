const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default


module.exports = defineConfig({
  e2e: {
        watchForFileChanges:false,
		    defaultCommandTimeout:6000,
        baseUrl: 'https://www.goibibo.com',
		    setupNodeEvents(on, config) {
          on('file:preprocessor', cucumber()) 
    },
    specPattern: "cypress/e2e/*/*.feature"
  },
});
