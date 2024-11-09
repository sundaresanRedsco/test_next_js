describe("LoginForm", () => {
  it("should show an error for invalid email / password", () => {
    cy.visit("/sign");

    // Fill out an invalid email (e.g., without @ symbol)
    cy.get('[data-test="email-input"]').type("invalidemail");

    // Fill out a valid password
    cy.get('[data-test="password-input"]').type("Pass@1234");

    // Click the "Sign In" button
    cy.get('[data-test="sign-in-button"]').click();

    // Assert that an error message for invalid email is displayed
    cy.contains("Invalid Email / Password");
  });
  it("should show an error when fields are not filled", () => {
    // Visit the login page
    cy.visit("/sign"); // Replace with the URL of your login page

    // Click the "Sign In" button without filling out the form
    cy.get('[data-test="sign-in-button"]').click();

    // Assert that an error message is displayed
    cy.contains("Email is Required");
    cy.contains("Password is Required");

    // You can add more assertions related to error handling
  });
  it("should fill out and submit the login form", () => {
    // Visit the login page
    cy.visit("/sign"); // Replace with the URL of your login page

    // Fill out the email input field
    cy.get('[data-test="email-input"]').type("unipro@gmail.com");

    // Fill out the password input field
    cy.get('[data-test="password-input"]').type("Pass@1234");

    // Check the "Remember me" checkbox
    cy.get('[data-test="remember-me-checkbox"]') // Select the containing span
      .find('input[type="checkbox"]') // Find the checkbox input element within the span
      .check(); // Check the checkbox

    // Click the "Sign In" button
    cy.get('[data-test="sign-in-button"]').click();

    // Assert that the user is navigated to the expected page after successful login
    // cy.url().should("eq", "/"); // Replace with the expected URL

    // You can add more assertions as needed
  });
});
