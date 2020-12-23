import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user, setUser }) => {
  const handleClick = (event) => {
    event.preventDefault();
    setUser(null);
  };
  return (
    <div>
      <h2>blogs</h2>
      {`${user} logged in `}
      <button onClick={handleClick} type="button">logout</button>
      <br />
      <br />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Blogs;
