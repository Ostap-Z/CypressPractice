const { defineConfig } = require('cypress');

const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');

const {
  preprocessor,
} = require('@badeball/cypress-cucumber-preprocessor/browserify');


async function setupNodeEvents (on, config) {
  await addCucumberPreprocessorPlugin (on, config);

  on('file:preprocessor', preprocessor (config));
  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 6_000,
  watchForFileChanges: false,
  experimentalWebKitSupport: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',

  e2e: {
    // TODO: replace it with the SUT url in future PRs
    baseUrl: 'https://example.cypress.io',
    specPattern: [
      'tests/**/*cy.js',
      'tests/**/*.feature'
    ],
    setupNodeEvents,
  },
});
