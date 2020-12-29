/* eslint-disable prefer-arrow-callback,func-names */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3012/api/testing/reset');
    cy.visit('http://localhost:3012');
  });

  it('Login form is shown', function () {
    cy.get('#loginForm').should('be.visible');
    cy.get('#loginForm').should('contain', 'username');
    cy.get('#loginForm').get('button').should('contain', 'login');
  });
});
