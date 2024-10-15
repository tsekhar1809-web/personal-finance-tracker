const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //this command initiate create test case option and create test step option through studio commands
    //baseUrl:'https://example.cypress.io/commands/actions',
    experimentalStudio:true,    
    //experimentalRunAllSpecs:true,   
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
