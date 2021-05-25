import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { makeNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';

const NewBlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const { reset: resetTitle, ...title } = useField('title');
  const { reset: resetAuthor, ...author } = useField('title');
  const { reset: resetUrl, ...url } = useField('title', 'url');

  const reset = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      }));
      reset();
      toggleVisibility();
      dispatch(makeNotification({ message: `a new blog: ${title.value} by ${author.value}`, color: 'green' }));
    } catch (e) {
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addNewBlog}>
        <div>
          {'title: '}
          <input id="title" {...title} />
        </div>

        <div>
          {'author: '}
          <input id="author" {...author} />
        </div>

        <div>
          {'url: '}
          <input id="url" {...url} />
        </div>

        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default NewBlogForm;
