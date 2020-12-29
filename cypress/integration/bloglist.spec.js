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
    cy.get('#loginForm')
      .should('be.visible');
    cy.get('#loginForm')
      .should('contain', 'username');
    cy.get('#loginForm')
      .get('button')
      .should('contain', 'login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username')
        .type(user.username);
      cy.get('input#password')
        .type(user.password);
      cy.get('#loginButton')
        .click();
      cy.contains('Jayanth PSY');
      cy.get('button')
        .contains('login')
        .should('not.exist');
    });

    it('fails with wrong credentials', function () {
      cy.get('input#username')
        .type(user.username);
      cy.get('input#password')
        .type('wrong-password');
      cy.get('button')
        .contains('login')
        .click();
      cy.contains('Invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
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
      cy.contains('new blog')
        .click();
      cy.get('input#title')
        .type('First Blog');
      cy.get('input#author')
        .type('Jay PSY');
      cy.get('input#url')
        .type('http://localhost:3652/first-blog');
      cy.get('button')
        .contains('create')
        .click();
      cy.get('.blog')
        .contains('First Blog');
    });

    describe('after creating a blog', function () {
      const blog = {
        title: 'First Blog',
        author: 'Jay PSY',
        url: 'http://localhost:3652/first-blog',
      };

      beforeEach(function () {
        cy.contains('new blog')
          .click();
        cy.get('input#title')
          .type(blog.title);
        cy.get('input#author')
          .type(blog.author);
        cy.get('input#url')
          .type(blog.url);
        cy.get('button')
          .contains('create')
          .click();
        cy.get('.blog')
          .contains('First Blog');
      });

      it('can be liked', function () {
        cy.get('.blog')
          .contains('First Blog')
          .siblings()
          .get('button')
          .contains('view')
          .click();

        // get initial likes
        let likesCount;
        cy.get('.blogLikes')
          .should(function ($div) {
            const text = $div.text();
            likesCount = parseInt(text.match(/\d+/)[0], 10);
          });

        // click like button
        cy.get('.blog')
          .contains('First Blog')
          .siblings()
          .get('button')
          .contains('like')
          .click();

        cy.get('.blogLikes')
          .should(function ($div) {
            const text = $div.text();
            expect(text)
              .to
              .include(likesCount + 1);
          });
      });

      it('can be deleted', function () {
        cy.get('.blog')
          .contains('First Blog')
          .siblings()
          .get('button')
          .contains('view')
          .click();

        cy.get('.blog')
          .contains('First Blog')
          .siblings()
          .get('button')
          .contains('delete')
          .click();

        cy.get('.blog').contains('First Blog')
          .should('not.exist');
      });
    });
  });
});
