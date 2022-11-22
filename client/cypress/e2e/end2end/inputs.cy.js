/// <reference types="cypress" />

describe('inputs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('guess count should increase if not all answers are correct', () => {
    cy.get('input').then((els) => {
      [...els].forEach((el) => cy.wrap(el).type('Hello World'));
    });
    cy.get('#prompt-form > .chakra-button').should('be.visible').click();
    cy.get('.guess-count').contains('1 / 5 Guesses');
    cy.get(':nth-child(2) > .flip-card-inner > .unknown').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
    cy.get(':nth-child(2) > .flip-card-inner > .unknown').should('be.visible');
  });

  it('should show results after 5 guesses', () => {
    for (let i = 0; i < 5; i++) {
      // eslint-disable-next-line
      cy.get('input').then((els) => {
        [...els].forEach((el) => cy.wrap(el).type('Hello World'));
      });
      cy.get('#prompt-form > .chakra-button').should('be.visible').click();
    }

    cy.get('input').first().should('not.be.visible');
    cy.get(':nth-child(2) > .flip-card-inner > .flip-card-back').should(
      'have.css',
      'background-color',
      'rgb(196, 47, 48)'
    );
    cy.get('.image-loading').should('be.visible');
    cy.get('.chakra-modal__close-btn').should('be.visible').click();
    cy.get('.css-i857na').click();
    cy.get('.chakra-modal__close-btn').should('be.visible').click();
  });
});
