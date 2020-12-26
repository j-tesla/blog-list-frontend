import React, { useEffect, useState, useRef } from 'react';
import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blogs = ({ user, setUser, makeNotification }) => {
  const [blogs, setBlogs] = useState([]);

  // get blogs from backend on first render
  useEffect(() => {
    (async () => {
      const blogsToSave = await blogsService.getAll();
      setBlogs(blogsToSave);
    })();
  }, []);

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
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
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
