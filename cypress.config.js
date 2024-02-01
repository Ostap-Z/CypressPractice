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

  env: {
    conduitUiUrl: 'https://conduit.realworld.how/',
    conduitApiUrl: 'https://api.realworld.io/api/'
  },

  e2e: {
    baseUrl: 'https://conduit.realworld.how/',
    specPattern: [
      'tests/**/*cy.js',
      'tests/**/*.feature'
    ],
    setupNodeEvents,
  },
});
