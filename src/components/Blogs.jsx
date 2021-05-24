import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
// import blogsService from '../services/blogs';

const Blogs = () => {
  const { blogs } = useSelector((state) => (state));

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  return (
    <div>
      <div style={paddedDivStyle}>
        <Toggleable buttonLabel="new blog" ref={newBlogRef}>
          <NewBlogForm
            toggleVisibility={toggleVisibility}
          />
        </Toggleable>
      </div>

      <div style={paddedDivStyle}>
        {blogs.map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {` by ${blog.author}`}
          </div>
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
};

export default Blogs;
