import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import LoginInfo from './LoginInfo';
import NewBlogForm from './NewBlogForm';
import blogsService from '../services/blogs';

const Blogs = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const blogsToSave = await blogsService.getAll();
      setBlogs(blogsToSave);
    })();
  }, []);
  return (
    <div>
      <h2>blogs</h2>
      <LoginInfo user={user} setUser={setUser} />
      <br />
      <h3>create new</h3>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Blogs;
