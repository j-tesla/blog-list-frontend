import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
// import blogsService from '../services/blogs';
import { initialiseBlogs } from '../reducers/blogReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const { activeUser, blogs } = useSelector((state) => (state));

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  // get blogs from backend on first render
  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  return (
    <div>
      <div style={paddedDivStyle}>
        <LoginInfo />
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
            owned={activeUser.username === blog.user.username}
          />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
};

export default Blogs;
