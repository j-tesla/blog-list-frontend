/* eslint-disable prefer-arrow-callback,func-names,no-restricted-syntax,no-loop-func */

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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', '/api/login', user)
        .then(function (response) {
          window.localStorage.setItem('bloglistUser', JSON.stringify(response.body));
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
          .then(function ($div) {
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

        cy.get('.blog')
          .contains('First Blog')
          .should('not.exist');
      });
    });

    it('blogs are displayed sorted by likes', function () {
      const blogs = [];
      const authors = ['C V Raman', 'A P J Abdul Kalam', 'Homi J Bhabha', 'S Ramanujan', 'Meghnad Saha', 'S N Bose'];
      for (let i = 0; i < 10; i += 1) {
        blogs.push({
          title: `Science Blog ${i}`,
          author: authors[Math.floor(Math.random() * authors.length)],
          url: `https://localhost:3652/blog${i}`,
          likes: Math.floor(Math.random() * 100),
        });
      }
      blogs.forEach(function (blog) {
        cy.request({
          url: '/api/blogs',
          method: 'POST',
          body: blog,
          headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('bloglistUser')).token}`,
          },
        });
      });

      cy.visit('/');

      let prevLikes = 10e9;
      let likesCount;
      for (let i = 0; i < 10; i += 1) {
        cy.get('.blogLikes').eq(i).then(function ($div) {
          const text = $div.text();
          likesCount = parseInt(text.match(/\d+/)[0], 10);
          expect(likesCount - 1).to.be.lessThan(prevLikes);
          prevLikes = likesCount;
        });
      }
    });
  });
});
