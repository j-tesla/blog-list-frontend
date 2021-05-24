import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogsService from './services/blogs';
import Notifications from './components/Notifications';

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
          ? (<h2>login to application</h2>)
          : (<h2>blogs</h2>)
      }
      <Notifications />
      {
        user === null
          ? (<LoginForm setUser={setUser} />)
          : (<Blogs user={user} setUser={setUser} />)
      }
    </div>
  );
};

export default App;
