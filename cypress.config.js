
const { defineConfig } = require('cypress');

module.exports = defineConfig({

  // Video and screenshots
  video: true,
  screenshotOnRunFailure: true,

  // E2E configuration
  e2e: {
    baseUrl: 'https://www.lacoste.com',

    specPattern: 'cypress/e2e/**/*.cy.js',

    supportFile: 'cypress/support/e2e.js',

    fixturesFolder: 'cypress/fixtures',

    setupNodeEvents(on, config) {
      // Node event listeners can be registered here

      return config;
    }
  }

});
