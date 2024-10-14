const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //this command initiate create test case option and create test step option through studio commands
        experimentalStudio:true,    
    //experimentalRunAllSpecs:true,   
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
