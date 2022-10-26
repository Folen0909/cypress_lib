import * as emails from "../fixtures/emails.json";

describe('Test group #1', () => {

  beforeEach(() => {
    cy.visitBaseUrl();
  });

  afterEach(() => {

  });
emails.email.forEach((email, index) => {

  it("Test #" + index + ": " + email, () => {
    cy.wait(1000);
    cy.contains("Dječji vrtić \"Bajka\", Zagreb")
        .next()
        .within(() => {
          cy.contains("Glasaj").click();
        }).then(() => {
      cy.get("input[name='email']").type(email);
      cy.get("input[type='submit']").click();
    });
  });
});

});