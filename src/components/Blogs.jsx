import React, { useEffect, useState, useRef } from 'react';
import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blogs = ({ user, setUser, makeNotification }) => {
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
      blogsToSave.sort((blagA, blogB) => (blagA.likes - blogB.likes));
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
    setBlogs(blogs.map((blog) => (blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
      .sort((blogA, blogB) => (blogA.likes - blogB.likes)));
  };

  return (
    <div>
      <div style={paddedDivStyle}>
        <LoginInfo user={user} setUser={setUser} />
      </div>

      <div style={paddedDivStyle}>
        <Toggleable buttonLabel="new blog" ref={newBlogRef}>
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            makeNotification={makeNotification}
            toggleVisibility={toggleVisibility}
          />
        </Toggleable>
      </div>

      <div style={paddedDivStyle}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            makeNotification={makeNotification}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            owned={user.username === blog.user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
