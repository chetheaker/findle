/// <reference types="cypress" />

describe('light/dark mode and higher color contrast working', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should turn to light mode on click', () => {
    cy.get(':nth-child(3) > svg').click();
    cy.get(':nth-child(1) > .toggle > .lbl').should('be.visible').click();
    cy.get('.chakra-modal__close-btn').should('be.visible').click();
    cy.get('.contest').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
    cy.get(':nth-child(2) > .flip-card-inner > .unknown').should(
      'have.css',
      'background-color',
      'rgb(0, 0, 0)'
    );
  });

  it('should turn to high contrast mode on click', () => {
    cy.get(':nth-child(3) > svg').click();
    cy.get(':nth-child(2) > .toggle > .lbl').should('be.visible').click();
    cy.get('.chakra-modal__close-btn').should('be.visible').click();
    cy.get('#prompt-form > .chakra-button').should(
      'have.css',
      'background-color',
      'rgb(133, 192, 249)'
    );
    cy.get(':nth-child(2) > .overlay').should(
      'have.css',
      'background-color',
      'rgb(133, 192, 249)'
    );
  });

  it('should turn to high contrast and light mode when both are clicked', () => {
    cy.get(':nth-child(3) > svg').click();
    cy.get(':nth-child(1) > .toggle > .lbl').should('be.visible').click();
    cy.get(':nth-child(2) > .toggle > .lbl').should('be.visible').click();
    cy.get('.chakra-modal__close-btn').should('be.visible').click();
    cy.get('#prompt-form > .chakra-button').should(
      'have.css',
      'background-color',
      'rgb(133, 192, 249)'
    );
    cy.get(':nth-child(2) > .overlay').should(
      'have.css',
      'background-color',
      'rgb(133, 192, 249)'
    );
    cy.get(':nth-child(2) > .flip-card-inner > .unknown').should(
      'have.css',
      'background-color',
      'rgb(0, 0, 0)'
    );
  });
});
