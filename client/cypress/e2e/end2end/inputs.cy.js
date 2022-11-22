/// <reference types="cypress" />

describe('inputs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('guess count should increase if not all answers are correct', () => {
    cy.get('input').type('alalalalalaaalla');
  });
});
