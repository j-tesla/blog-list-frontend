import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { makeNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    try {
      dispatch(createBlog({
        title,
        author,
        url,
      }));
      setTitle('');
      setAuthor('');
      setUrl('');
      toggleVisibility();
      dispatch(makeNotification({ message: `a new blog: ${title} by ${author}`, color: 'green' }));
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
          <input id="title" value={title} onChange={handleChange(setTitle)} />
        </div>

        <div>
          {'author: '}
          <input id="author" value={author} onChange={handleChange(setAuthor)} />
        </div>

        <div>
          {'url: '}
          <input id="url" value={url} onChange={handleChange(setUrl)} />
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
