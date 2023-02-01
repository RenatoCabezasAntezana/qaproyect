const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const mysql = require("mysql");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/*.feature",
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("task", {
        DATABASE({dbConfig, sql}){
          const client = mysql.createConnection(dbConfig);
          return new Promise((resolve, reject) => {
            client.query(sql, (error, results) => {
              if(error) reject(error);
              resolve(results);
            })
          })
        }
      })

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    DB: {
      host: "localhost",
      user: "root",
      password: "admin",
      database: "ecommerce"
    }
  },
});
