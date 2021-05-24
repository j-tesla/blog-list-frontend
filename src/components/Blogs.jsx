import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
// import blogsService from '../services/blogs';
import { initialiseBlogs } from '../reducers/blogReducer';

const Blogs = ({
  user,
  setUser,
}) => {
  const dispatch = useDispatch();
  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  // states
  const blogs = useSelector((state) => state.blogs);

  // get blogs from backend on first render
  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  return (
    <div>
      <div style={paddedDivStyle}>
        <LoginInfo user={user} setUser={setUser} />
      </div>

      <div style={paddedDivStyle}>
        <Toggleable buttonLabel="new blog" ref={newBlogRef}>
          <NewBlogForm
            toggleVisibility={toggleVisibility}
          />
        </Toggleable>
      </div>

      <div style={paddedDivStyle}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            owned={user.username === blog.user.username}
          />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blogs;
