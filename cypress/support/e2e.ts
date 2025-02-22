// cypress/support/e2e.ts
import "./commands"; // Import custom commands if you have them

// Global configurations or hooks can go here
beforeEach(() => {
  // Code that should run before every test
  cy.clearCookies();
});
