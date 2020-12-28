import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import customPropTypes from '../utils/customPropTypes';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blog = ({
  blog, makeNotification, likeBlog, removeBlog, owned,
}) => {
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
      await blogsService.update(blog.id, { likes: blog.likes + 1 });
      likeBlog(blog.id);
    } catch (e) {
      makeNotification(e.response.data.error, 'red');
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) await blogsService.delete(blog.id);
      removeBlog(blog.id);
    } catch (e) {
      if (e.response.status === 403) makeNotification('not your blog to delete, mate!', 'red');
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
  likeBlog: PropTypes.func.isRequired,
  makeNotification: PropTypes.func.isRequired,
  owned: PropTypes.bool.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
