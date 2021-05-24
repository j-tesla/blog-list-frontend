import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blogs = ({
  user,
  setUser,
}) => {
  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  // states
  const [blogs, setBlogs] = useState([]);

  // get blogs from backend on first render
  useEffect(() => {
    (async () => {
      const blogsToSave = await blogsService.getAll();
      blogsToSave.sort((blogA, blogB) => (blogB.likes - blogA.likes));
      setBlogs(blogsToSave);
    })();
  }, []);

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  const removeBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const likeBlog = (id) => {
    setBlogs(blogs.map((blog) => (blog.id === id ? {
      ...blog,
      likes: blog.likes + 1,
    } : blog))
      .sort((blogA, blogB) => (blogB.likes - blogA.likes)));
  };

  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog));
  };

  return (
    <div>
      <div style={paddedDivStyle}>
        <LoginInfo user={user} setUser={setUser} />
      </div>

      <div style={paddedDivStyle}>
        <Toggleable buttonLabel="new blog" ref={newBlogRef}>
          <NewBlogForm
            addBlog={addBlog}
            toggleVisibility={toggleVisibility}
          />
        </Toggleable>
      </div>

      <div style={paddedDivStyle}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
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
