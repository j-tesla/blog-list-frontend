import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogsService from './services/blogs';
// import logger from './utils/logger';
// import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser');
    if (userJSON) {
      const userObj = JSON.parse(userJSON);
      blogsService.setToken(userObj.token);
      setUser(userObj);
    }
  }, []);

  return (
    <div>
      {
        user === null
          ? (<LoginForm setUser={setUser} />)
          : (<Blogs user={user.name} setUser={setUser} />)
      }
    </div>
  );
};

export default App;
