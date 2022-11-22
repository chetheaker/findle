/// <reference types="cypress" />

describe('thumbnail', () => {
    it('should make next picture available if you make a guess.', () => {
      cy.visit('http://localhost:3000');
        cy.get(':nth-child(2) > .overlay').should('have.css',
        'background-color',
        'rgb(56, 161, 105)')
        cy.get('input').then((els) => {
            [...els].forEach((el) => cy.wrap(el).type('Hello World'));
          });
          cy.get('#prompt-form > .chakra-button').click()
          cy.get(':nth-child(2) > .overlay').should('not.exist');
          
          cy.get(':nth-child(3) > .overlay').should('have.css',
        'background-color',
        'rgb(56, 161, 105)')
        cy.get('input').then((els) => {
            [...els].forEach((el) => cy.wrap(el).type('Hello World'));
          });
          cy.get('#prompt-form > .chakra-button').click()
          cy.get(':nth-child(3) > .overlay').should('not.exist');

          cy.get(':nth-child(4) > .overlay').should('have.css',
        'background-color',
        'rgb(56, 161, 105)')
        cy.get('input').then((els) => {
            [...els].forEach((el) => cy.wrap(el).type('Hello World'));
          });
          cy.get('#prompt-form > .chakra-button').click()
          cy.get(':nth-child(4) > .overlay').should('not.exist');

          cy.get(':nth-child(5) > .overlay').should('have.css',
        'background-color',
        'rgb(56, 161, 105)')
        cy.get('input').then((els) => {
            [...els].forEach((el) => cy.wrap(el).type('Hello World'));
          });
          cy.get('#prompt-form > .chakra-button').click()
          cy.get(':nth-child(5) > .overlay').should('not.exist');
    });

    it('if you click thumbnail picture the picture changes', () => {
        cy.get('.thumbnails > :nth-child(1) > .image-container > .image').click()
        cy.get('.thumbnails > :nth-child(1) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
          const src1 = firstSrc
          cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
            expect(nextSrc).to.equal(src1)
          });
        });

        cy.get('.thumbnails > :nth-child(2) > .image-container > .image').click()
        cy.get('.thumbnails > :nth-child(2) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
          const src1 = firstSrc
          cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
            expect(nextSrc).to.equal(src1)
          });
        });

        cy.get('.thumbnails > :nth-child(3) > .image-container > .image').click()
        cy.get('.thumbnails > :nth-child(3) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
          const src1 = firstSrc
          cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
            expect(nextSrc).to.equal(src1)
          });
        });

        cy.get('.thumbnails > :nth-child(4) > .image-container > .image').click()
        cy.get('.thumbnails > :nth-child(4) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
          const src1 = firstSrc
          cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
            expect(nextSrc).to.equal(src1)
          });
        });

        cy.get('.thumbnails > :nth-child(5) > .image-container > .image').click()
        cy.get('.thumbnails > :nth-child(5) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
          const src1 = firstSrc
          cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
            expect(nextSrc).to.equal(src1)
          });
        }); 
  });

  it('the picture should change to the newest one every time you guess wrong', () => {
    cy.visit('http://localhost:3000');
    cy.get('.thumbnails > :nth-child(1) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
      const src1 = firstSrc
      cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
        expect(nextSrc).to.equal(src1)
      });
    });

    cy.get('input').then((els) => {
      [...els].forEach((el) => cy.wrap(el).type('Hello World'));
    });
    cy.get('#prompt-form > .chakra-button').click()
    cy.get('.thumbnails > :nth-child(2) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
      const src1 = firstSrc
      cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
        expect(nextSrc).to.equal(src1)
      });
    });

    cy.get('input').then((els) => {
      [...els].forEach((el) => cy.wrap(el).type('Hello World'));
    });
    cy.get('#prompt-form > .chakra-button').click()
    cy.get('.thumbnails > :nth-child(3) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
      const src1 = firstSrc
      cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
        expect(nextSrc).to.equal(src1)
      });
    });

    cy.get('input').then((els) => {
      [...els].forEach((el) => cy.wrap(el).type('Hello World'));
    });
    cy.get('#prompt-form > .chakra-button').click()
    cy.get('.thumbnails > :nth-child(4) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
      const src1 = firstSrc
      cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
        expect(nextSrc).to.equal(src1)
      });
    });

    cy.get('input').then((els) => {
      [...els].forEach((el) => cy.wrap(el).type('Hello World'));
    });
    cy.get('#prompt-form > .chakra-button').click()
    cy.get('.thumbnails > :nth-child(5) > .image-container > .image').invoke('attr', 'src').then((firstSrc) => {
      const src1 = firstSrc
      cy.get('.image-cont > .image-container > .image').invoke('attr', 'src').then((nextSrc) => {
        expect(nextSrc).to.equal(src1)
      });
    }); 
});
  });