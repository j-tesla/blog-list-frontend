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
      cy.get('button').contains('login').should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.get('input#username').type(user.username);
      cy.get('input#password').type('wrong-password');
      cy.get('button').contains('login').click();
      cy.contains('Invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', '/api/login', user)
        .then(function (response) {
          localStorage.setItem('bloglistUser', JSON.stringify(response.body));
        });
      cy.visit('/');
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('input#title').type('First Blog');
      cy.get('input#author').type('Jay PSY');
      cy.get('input#url').type('http://localhost:3652/first-blog');
      cy.get('button').contains('create').click();
      cy.get('.blog').contains('First Blog');
    });
  });
});