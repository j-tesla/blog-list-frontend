import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import blogsService from './services/blogs';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [timeoutInstance, setTimeoutInstance] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser');
    if (userJSON) {
      const userObj = JSON.parse(userJSON);
      blogsService.setToken(userObj.token);
      setUser(userObj);
    }
  }, []);

  useEffect(() => {
    clearTimeout(timeoutInstance);
    setTimeoutInstance(setTimeout(() => {
      setNotificationMessage(null);
    }, 5000));
  }, [notificationMessage]);

  const makeNotification = (message, color) => {
    setNotificationMessage({
      message,
      color,
    });
  };

  return (
    <div>
      {
        user === null
          ? (<h2>login to application</h2>)
          : (<h2>blogs</h2>)
      }
      {
        notificationMessage && (<Notification message={notificationMessage} />)
      }
      {
        user === null
          ? (<LoginForm setUser={setUser} makeNotification={makeNotification} />)
          : (<Blogs user={user.name} setUser={setUser} makeNotification={makeNotification} />)
      }
    </div>
  );
};

export default App;
