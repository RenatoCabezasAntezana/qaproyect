const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("select products", () => {
  cy.task("DATABASE", {
    dbConfig: Cypress.config("DB"),
    sql: "select * from productos",
  }).then((result) => {
    result.forEach((row) => {
      cy.log(JSON.stringify(row));
    });
  });
});

When("insert products", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.task("DATABASE", {
      dbConfig: Cypress.config("DB"),
      sql: `insert into productos (nombre,precio) values ('${
        row.nombre
      }',${Number(row.precio)})`,
    }).then((result) => {
      cy.log(result);
    });
  });
});

Then("verify products inserts", () => {
  cy.task("DATABASE", {
    dbConfig: Cypress.config("DB"),
    sql: "select * from productos",
  }).then((result) => {
    result.forEach((row) => {
      cy.log(JSON.stringify(row));
    });
  });
});
