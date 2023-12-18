const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://minisaesipn.web.app/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
