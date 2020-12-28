import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

const blog = {
  author: 'Jayanth',
  title: 'How to write React Tests',
  url: 'localhost:3452/react-tests',
  likes: 5,
  id: '5fe32bafb080912de5a5f891',
  user: {
    blogs: ['5fe32bafb080912de5a5f891', '5fe32bffb080912de5a5f89f'],
    name: 'Jayanth PSY',
    username: 'j-test',
  },
};

describe('<Blog />', () => {
  let component;
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        removeBlog={() => {}}
        owned={false}
        makeNotification={() => {}}
        likeBlog={() => {}}
      />,
    );
  });

  test('renders title and author', () => {
    const blogHead = component.container.querySelector('.blogHead');
    expect(blogHead).toHaveTextContent(blog.title);
    expect(blogHead).toHaveTextContent(blog.title);
    expect(blogHead).toBeVisible();
  });

  test('contains blog details like url and likes', () => {
    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails)
      .toContainElement(component.container.querySelector('.blogLikes'));
    expect(component.container.querySelector('.blogLikes'))
      .toHaveTextContent(blog.likes);
    expect(blogDetails)
      .toContainElement(component.container.querySelector('.blogUser'));
    expect(component.container.querySelector('.blogUser'))
      .toHaveTextContent(blog.user.name);
    expect(blogDetails)
      .toContainElement(component.container.querySelector('.blogUrl'));
    expect(component.container.querySelector('.blogUrl'))
      .toHaveTextContent(blog.url);
  });

  test('hides blog details initially', () => {
    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails)
      .not.toBeVisible();
  });

  describe("after clicking 'view' button", () => {
    beforeEach(() => {
      const viewButton = component.getByText('view');
      fireEvent.click(viewButton);
    });

    test('renders blog details', () => {
      const blogDetails = component.container.querySelector('.blogDetails');
      expect(blogDetails)
        .toBeVisible();
    });
  });
});
