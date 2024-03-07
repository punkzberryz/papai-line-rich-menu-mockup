describe("Upload Rich Menu Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("upload rich menu", () => {
    cy.getDataTest("link-upload-richmenu").click();
    cy.getDataTest("upload-richmenu-title").contains(/upload richmenu/i);

    //input validation error
    cy.contains(/required/i).should("not.exist");
    cy.getDataTest("upload-richmenu-button").click();
    cy.contains(/required/i).should("be.visible");
    //happy path
  });
});
