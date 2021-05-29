/// <reference types="cypress" />




context('Agregando / Eliminando elementos', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/')
    })

    it('Entrar la ruta de agregar y remover elementos', () => {
        cy.contains('Add/Remove Elements').click();

        cy.contains('Add/Remove Elements').should('exist');

        cy.get('.example > button').should('have.text', 'Add Element');

        // Custom Command
        cy.hammerClicks(10, '.example > button');

        cy.get('#elements .added-manually').as('btnDelete');

        cy.get('@btnDelete').should('exist');

        // Custom Command
        cy.hammerClicks(10, '#elements > :nth-child(1)');

        cy.get('@btnDelete').should('not.exist');

    })
})
