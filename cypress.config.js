const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://993b1a51-dd4b-4578-a07b-8c0e8b2a86d6.mock.pstmn.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
