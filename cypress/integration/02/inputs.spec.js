/// <reference types="cypress" />

context("Experimentando con inputs", () => {
  beforeEach(() => {
    cy.visit("https://angular.realworld.io/");
    8;
  });

  it("Login de la aplicación", () => {
    cy.fixture("user").then((user) => {
      // Selectores con clases es muy mala práctica pero la mayoria de los sitios webs no tienen implementado los atributos data-*
      cy.get(".container .navbar-nav .nav-item").as("navBar");

      cy.get("@navBar").then(($li) => {
        const btnSignUp = $li.eq(2).text().trim();
        expect(btnSignUp).eq("Sign up");
      });

      cy.get("@navBar").last().click();

      cy.url().should("include", "/register");

      cy.get('[formcontrolname="username"]').type(user.username).as("username");
      cy.get('[formcontrolname="email"]').type(user.email).as("email");
      cy.get('[formcontrolname="password"]').type(user.password).as("password");

      cy.existValue("@username", user.username);
      cy.existValue("@email", user.email);
      cy.existValue("@password", user.password);

      // cy.get('@username').then(($input) => {
      //     const val = $input.val();
      //     expect(val).to.eq(user.username);
      // })

      // cy.get('@email').then(($input) => {
      //     const val = $input.val();
      //     expect(val).to.eq(user.email);
      // })

      // cy.get('@password').then(($input) => {
      //     const val = $input.val();
      //     expect(val).to.eq(user.password);
      // })

      cy.get('[type="submit"]').as("submit").click();

      if (cy.get(".error-messages").contains("been taken")) {
        cy.get("@navBar").eq(1).click();
        cy.get("@email").type(user.email);
        cy.get("@password").type(user.password);
        cy.get("@submit").click();

        cy.get("body").should("contain.text", user.username);
      } else {
        cy.log("Nothing");
      }

      // cy.get('.error-messages').should('', 'been taken').then(($li) => {

      //     cy.log($li.length);

      //     if ($li.length > 0) {
      //         cy.get('@navBar').eq(1).click();
      //     } else {
      //         cy.log('No pasaste')
      //     }

      // })
    });
  });
});
