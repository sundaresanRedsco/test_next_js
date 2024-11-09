Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  return false;
});

declare namespace Cypress {
  interface Chainable<Subject> {
    login(): Chainable<any>; // You might need to adjust the return type based on your specific use case
  }
}
