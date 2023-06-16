const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
  "numTestsKeptInMemory": 0,
  "chromeWebSecurity": false,
  "pageLoadTimeout": 200000,
  "frameLoadTimeout": 200000,
  "responseTimeout": 200000,
  "requestTimeout": 200000,
  "defaultCommandTimeout": 200000,
  "execTimeout": 200000,
  "retries": 1,
  e2e:
  {
    env:
    {
      dev:
      {
        baseUrl: "https://mtx-dev.compass-group.digital/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html",
        homePageUrl: "https://mtx-dev.compass-group.digital/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Quotation-launch",
        username: "padmanabans",
        password: "india12345",
        envCode: "220",
        client: "Allreal Bewirtschaftung ",
      },
      qa:
      {
        baseUrl: "https://mtx-qas.compass-group.digital/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html",
        homePageUrl: "https://mtx-qas.compass-group.digital/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html#Quotation-launch",
        username: "padmanabans",
        password: "india12345",
        envCode: "211",
        client: "Aéroport International de Genève ",
        unit: "CH0C142000-142 LIGHTCUBE",
        unitdropdown: "CH0C142000-142 LIGHTCUBE",
        outlet: "CH0C142000-142 Lightcube",
        outletdropdown: "CH0C142000-142 Lightcube"
      },
      preprod:
      {
        baseUrl: "https://mtx-preprod.compass-group.digital/sap/bc/ui2/flp?saml2=disabled#Shell-home",
        homePageUrl: "https://mtx-preprod.compass-group.digital/sap/bc/ui2/flp?saml2=disabled#Quotation-launch",
        username: "jeyabalant",
        password: "Balan@01",
        envCode: "100",
        client: "Allreal Generalunternehmung AG ",
        unit: "CH0C142000-LIGHTCUBE",
        unitdropdown: "CH0C142000-LIGHTCUBE",
        outlet: "CH0C142001-Lightcube",
        outletdropdown: "CH0C142001-Lightcube"
      },
    },
    async setupNodeEvents(on, config) { // implement node event listeners here 
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature"
  },
});