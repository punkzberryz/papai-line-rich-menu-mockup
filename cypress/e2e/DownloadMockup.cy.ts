describe("Download Mockup Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("download image", () => {
    cy.contains(/line richmenu mockup/i);
    // image should be downloaded after clicking the button
    cy.readFile("cypress/downloads/rich-menu.jpeg").should("not.exist");
    cy.getDataTest("download-mockup-image-button").click();
    cy.readFile("cypress/downloads/rich-menu.jpeg");
  });
});
