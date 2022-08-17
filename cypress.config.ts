const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    redirectionLimit: 50,
    viewportWidth: 1920,
    viewportHeight: 1080,
    numTestsKeptInMemory: 100,
    experimentalSessionAndOrigin: true,
    baseUrl: "https://www.demoblaze.com/",
    env: {
      "email" : "",
      "password": "",
      "locale": "en-US",
      "specialDateFormat": "",
      "baseUrl": "https://www.demoblaze.com/"
    }
  },
});
