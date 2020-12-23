import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
// import logger from './utils/logger';
// import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const blogsToSave = await blogService.getAll();
      setBlogs(blogsToSave);
    })();
  }, []);

  return (
    <div>
      {
        user === null
          ? (<LoginForm setUser={setUser} />)
          : (<Blogs blogs={blogs} user={user.name} setUser={setUser} />)
      }
    </div>
  );
};

export default App;
