/* eslint-disable prefer-arrow-callback,func-names */

describe('Blog app', function () {
  let user;
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset');
    user = {
      name: 'Jayanth PSY',
      username: 'j-tesla',
      password: 'secure-password',
    };
    cy.request('POST', '/api/users', user);
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.get('#loginForm').should('be.visible');
    cy.get('#loginForm').should('contain', 'username');
    cy.get('#loginForm').get('button').should('contain', 'login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username').type(user.username);
      cy.get('input#password').type(user.password);
      cy.get('#loginButton').click();
      cy.contains('Jayanth PSY');
      cy.get('#loginForm').should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.get('input#username').type(user.username);
      cy.get('input#password').type('wrong-password');
      cy.get('#loginButton').click();
      cy.contains('Invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
