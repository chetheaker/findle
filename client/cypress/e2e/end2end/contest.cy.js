/// <reference types="cypress" />

describe('auth', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should be able to sign in', () => {
    cy.get('.right > .chakra-button').click();
  });
});
