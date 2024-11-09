/// <reference types="cypress" />

// Cypress/support/commands.js
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://api.apiflow.pro/api/auth/login",
    body: {
      email: "unipro@gmail.com",
      password: "Pass@1234",
    },
  }).then((response) => {
    // Store token in cookies
    cy.setCookie("token", response.body.token);

    // Store user profile in local storage
    cy.window().then((win) => {
      win.localStorage.setItem("userProfile", JSON.stringify(response.body));
    });

    cy.visit("/");
  });
});
