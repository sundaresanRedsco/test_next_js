describe("policy", () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit("/sign");

    // Perform login using the custom command
    cy.login();

    cy.get('[data-test="sidebar-expand-icon"]').click();
    cy.get('[data-test="apiRisk"]').click();
    cy.get('[data-test="ApiRiskPol"]').click();
  });

  it("To create policy group save without name", () => {
    cy.get('[data-test="create-new-policy-group"]').click();

    // // Fill out an invalid email (e.g., without @ symbol)
    // cy.get('[data-test="user_policy_name"]').type("");

    // Click the "Sign In" button
    cy.get('[data-test="policy-group-submit-btn"]').click();

    cy.contains("Policy Name is required");
  });

  it("To create policy group save without cateogary selection", () => {
    cy.get('[data-test="create-new-policy-group"]').click();

    cy.get('[data-test="user_policy_name"]').type("testPolicy");

    // Click the "Sign In" button
    cy.get('[data-test="policy-group-submit-btn"]').click();

    cy.contains("Please atleast select one test group");
  });

  it("To create policy group save with cateogary selection", () => {
    cy.get('[data-test="create-new-policy-group"]').click();

    cy.get('[data-test="user_policy_name"]').type("testPolicy");

    cy.get('[data-test="mainCat0"]').click();
    cy.get('[data-test="subCat1"]').click();

    cy.get('[data-test="policy-group-submit-btn"]').click();

    cy.contains("Policy Group created sucessfully");
  });
});
