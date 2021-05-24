import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blog, activeUser } = useSelector((state) => ({
    blog: state.blogs.find((blog) => blog.id.toString() === id), activeUser: state.activeUser,
  }));
  if (!blog) {
    return null;
  }

  const owned = activeUser === blog.user.id;

  // css
  const padding = {
    padding: 10,
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
    <div style={padding} className="blog">
      <h3 className="blogHead">
        {`${blog.title} by ${blog.author}`}
      </h3>
      <div className="blogDetails" style={padding}>
        <div className="blogUrl"><a href={blog.url}>{blog.url}</a></div>
        <div className="blogLikes">
          {`likes: ${blog.likes} `}
          <button className="likeButton" type="button" onClick={handleLike}>like</button>
        </div>
        <div className="blogUser">{`added by ${blog.user.name}`}</div>
        {owned && (<button className="deleteButton" type="button" onClick={handleDelete}>delete</button>)}
      </div>
    </div>
  );
};

Blog.propTypes = {
};

export default Blog;
