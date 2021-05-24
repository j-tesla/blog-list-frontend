import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import customPropTypes from '../utils/customPropTypes';
import Toggleable from './Toggleable';
import { makeNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({
  blog, owned,
}) => {
  const dispatch = useDispatch();
  // css
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // ref to Toggleable
  const blogRef = useRef();
  const toggleVisibility = () => {
    blogRef.current.toggleVisibility();
  };

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog));
    } catch (e) {
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) dispatch(removeBlog(blog));
    } catch (e) {
      if (e.response.status === 403) dispatch(makeNotification({ message: 'not your blog to delete, mate!', color: 'red' }));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blogHead">
        {`${blog.title} -${blog.author}`}
      </div>
      <Toggleable buttonLabel="view" cancelButton={false} ref={blogRef}>
        <button className="hideButton" type="button" onClick={toggleVisibility}>hide</button>
        <div className="blogDetails">
          <div className="blogUrl"><a href={blog.url}>{blog.url}</a></div>
          <div className="blogLikes">
            {`likes: ${blog.likes} `}
            <button className="likeButton" type="button" onClick={handleLike}>like</button>
          </div>
          <div className="blogUser">{`added by ${blog.user.name}`}</div>
          {owned && (<button className="deleteButton" type="button" onClick={handleDelete}>delete</button>)}
        </div>
      </Toggleable>
    </div>
  );
};

Blog.propTypes = {
  blog: customPropTypes.blog.isRequired,
  owned: PropTypes.bool.isRequired,
};

export default Blog;
