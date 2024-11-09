describe("project", () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit("/sign");

    // Perform login using the custom command
    cy.login();
    cy.wait(2000);
    cy.get('[data-test="sidebar-expand-icon"]').click();
    cy.get('[data-test="apiMan"]').click();
  });

  // it("To create project save without name", () => {
  //   cy.get('[data-test="apiManDB"]').click();
  //   cy.get('[data-test="create-new-project-btn"]').click();
  //   cy.get('[data-test="project-name-input"]').should("be.visible");

  //   // Click the "Save Project" button
  //   cy.get('[data-test="save-project-btn"]').click();

  //   cy.contains("Project Name is required");
  // });

  // it("error validation for special characters ", () => {
  //   cy.get('[data-test="apiManDB"]').click();
  //   cy.get('[data-test="create-new-project-btn"]').click();
  //   cy.get('[data-test="project-name-input"]').should("be.visible");

  //   const randomProjectName = generateRandomProjectName();
  //   cy.get('[data-test="project-name-input"]').type(randomProjectName);
  //   // Click the "Save Project" button
  //   cy.get('[data-test="save-project-btn"]').click();

  //   cy.contains("Special Characters and spaces are not allowed");
  // });

  // it("To create project successfully", () => {
  //   cy.get('[data-test="apiManDB"]').click();
  //   cy.get('[data-test="create-new-project-btn"]').click();
  //   cy.get('[data-test="project-name-input"]').should("be.visible");

  //   cy.get('[data-test="project-name-input"]').type("cypressTestProject01");
  //   cy.get('[data-test="project-description"]').type(
  //     "Sample Project Description"
  //   );

  //   // Click the "Save Project" button
  //   cy.get('[data-test="save-project-btn"]').click();
  //   cy.contains("New project created successfully");
  // });

  // it("To check error validation for same name", () => {
  //   cy.get('[data-test="apiManDB"]').click();
  //   cy.get('[data-test="create-new-project-btn"]').click();
  //   cy.get('[data-test="project-name-input"]').should("be.visible");

  //   cy.get('[data-test="project-name-input"]').type("cypressTestProject01");
  //   cy.get('[data-test="project-description"]').type(
  //     "Sample Project Description"
  //   );
  //   // Click the "Save Project" button
  //   cy.get('[data-test="save-project-btn"]').click();
  //   cy.contains("Project Name already exixsts");
  // });

  it("To updated project name and description", () => {
    cy.get('[data-test="apiManPr"]').click();

    cy.contains("cypressTestProject01menu").click();
    cy.contains("edit-project").click();
    cy.get('[data-test="project-name-update-input"]').type(
      "cypressTestProject01",
    );
    cy.get('[data-test="project-description-update-input"]').type(
      "Sample Project Description",
    );
    // Click the "Save Project" button
    cy.get('[data-test="update-save-project-btn"]').click();
    cy.contains("Project Name already exixsts");
  });
});

function generateRandomProjectName() {
  const length = 10; // Adjust the length of the random string as needed
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$$&@#%"; // Add special characters as needed
  let randomProjectName = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomProjectName += characters.charAt(randomIndex);
  }

  return randomProjectName;
}
