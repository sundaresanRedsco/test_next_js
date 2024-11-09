describe("SignUpForm", () => {
  it("should show an error when fields are not filled", () => {
    // Visit the signup page
    cy.visit("/sign/signup"); // Replace with the URL of your signup page

    // Click the "Sign Up" button without filling out the form
    cy.get('[data-test="sign-up-button"]').click();
    cy.wait(2000);
    // Assert that an error message is displayed
    cy.contains("First Name is required").should("be.visible");
    cy.contains("Last Name is required");
    cy.contains("Email is required");
    cy.contains("Password is required");
    cy.contains("Confirm Password is required");

    // You can add more assertions related to error handling
  });

  it("should show an error for an invalid email", () => {
    // Visit the signup page
    cy.visit("/sign/signup"); // Replace with the URL of your signup page

    // Fill out the form with an invalid email
    cy.get('[data-test="signup-email"]').type("invalid_email");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-button"]').click();

    // Assert that an error message for an invalid email is displayed
    cy.contains("Invalid Email");

    // You can add more assertions related to email validation
  });

  it("should show an error when password and confirm password do not match", () => {
    // Visit the signup page
    cy.visit("/sign/signup");

    cy.get('[data-test="signup-first-name"]').type("John");
    cy.get('[data-test="signup-last-name"]').type("Doe");
    cy.get('[data-test="signup-email"]').type("test@example.com");
    cy.get('[data-test="signup-password"]').type("Mismatched@Password1234");
    cy.get('[data-test="signup-confirm-password"]').type(
      "AnotherMismatched@Password1234",
    );

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-button"]').click();

    // Assert that an error message for mismatched passwords is displayed
    cy.contains("Passwords do not match");

    // You can add more assertions related to error handling
  });

  it("should show an error for an invalid password", () => {
    // Visit the signup page
    cy.visit("/sign/signup");

    // Fill out the form with an invalid password
    cy.get('[data-test="signup-password"]').type("InvalidPass");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-button"]').click();

    // Assert that an error message for an invalid password is displayed
    cy.contains(
      "Password must contain at least 8 characters, 1 uppercase, and 1 special character",
    ).should("be.visible");

    // You can add more assertions related to password validation
  });

  it("should show an error for an registered email", () => {
    // Visit the signup page
    cy.visit("/sign/signup"); // Replace with the URL of your signup page

    // Fill out the form fields
    cy.get('[data-test="signup-first-name"]').type("John");
    cy.get('[data-test="signup-last-name"]').type("Doe");
    cy.get('[data-test="signup-email"]').type("unipro@gmail.com");
    cy.get('[data-test="signup-password"]').type("Password@123");
    cy.get('[data-test="signup-confirm-password"]').type("Password@123");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-button"]').click();

    cy.contains(
      "This email address is already registered. Please use a different email address",
    ).should("be.visible");

    // You can add more assertions as needed
  });

  it("should fill out and submit the signup form", () => {
    // Visit the signup page
    cy.visit("/sign/signup"); // Replace with the URL of your signup page

    const baseEmail = "testuser";
    const uniqueTimestamp = new Date().getTime(); // You can use a timestamp
    const uniqueRandomString = Math.random().toString(36).substring(2, 10); // Or use a random string
    const uniqueEmail = `${baseEmail}_${uniqueTimestamp}_${uniqueRandomString}@example.com`;

    // Fill out the form fields
    cy.get('[data-test="signup-first-name"]').type("John");
    cy.get('[data-test="signup-last-name"]').type("Doe");
    cy.get('[data-test="signup-email"]').type(uniqueEmail);
    cy.get('[data-test="signup-password"]').type("Password@123");
    cy.get('[data-test="signup-confirm-password"]').type("Password@123");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-button"]').click();

    // Assert that the user is navigated to the expected page after successful signup
    cy.url().should("eq", "http://localhost:3000/sign/signup/company"); // Replace with the expected URL

    // You can add more assertions as needed
  });

  it("should fill out and submit the company signup form", () => {
    cy.setCookie("ttid", "testttid");
    cy.getCookie("ttid").should("exist");
    cy.wait(2000);
    // Visit the signup page
    cy.visit("/sign/signup/company"); // Replace with the URL of your signup page

    // Fill out the form fields
    cy.get('[data-test="signup-company-name"]').type("iprotecs");
    cy.get('[data-test="signup-mobile"]').type("8870912345");
    cy.get('[data-test="signup-occupation"]').type("Admin");
    cy.get('[data-test="signup-website"]').type("www.iprotecs.in");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-company-button"]').click();

    // Assert that the user is navigated to the expected page after successful signup
    cy.url().should("eq", "http://localhost:3000/sign/signup/company"); // Replace with the expected URL

    // You can add more assertions as needed
  });

  it("should show an error when fields are not filled", () => {
    // Visit the signup page
    cy.visit("/sign/signup/company"); // Replace with the URL of your signup page

    // Click the "Sign Up" button without filling out the form
    cy.get('[data-test="sign-up-company-button"]').click();
    cy.wait(2000);
    // Assert that an error message is displayed
    cy.contains("Your Company Name is required").should("be.visible");
    cy.contains("Your Mobile Number is required");
    cy.contains("Your Occupation is required");
    cy.contains("Company Website is required");

    // You can add more assertions related to error handling
  });

  it("should show an error for an invalid website name", () => {
    // Visit the signup page
    cy.visit("/sign/signup/company"); // Replace with the URL of your signup page

    // Fill out the form with an invalid website
    cy.get('[data-test="signup-website"]').type("invalid_website");

    // Click the "Sign Up" button
    cy.get('[data-test="sign-up-company-button"]').click();

    // Assert that an error message for an invalid website format is displayed
    cy.contains("Invalid website format");
  });
});
