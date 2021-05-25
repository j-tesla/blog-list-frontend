import React from 'react';
import { useDispatch } from 'react-redux';

import { makeNotification } from '../reducers/notificationReducer';
import { commentBlog } from '../reducers/blogReducer';
import customPropTypes from '../utils/customPropTypes';
import { useField } from '../hooks';

const NewBlogForm = ({ blog }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField('comment');

  const addComment = async (event) => {
    event.preventDefault();

    try {
      await dispatch(commentBlog(blog, comment.value));
      resetComment();
      dispatch(makeNotification({ message: `commented on blog: "${blog.title}"`, color: 'green' }));
    } catch (e) {
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
    }
  };

  // css
  const inlineStyle = {
    paddingLeft: 3,
    paddingRight: 3,
    display: 'inline',
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <div style={inlineStyle}>
          <input id="comment" {...comment} />
        </div>

        <div style={inlineStyle}>
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  blog: customPropTypes.blog.isRequired,
};

export default NewBlogForm;
