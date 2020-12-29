import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import logger from '../utils/logger';
import blogsService from '../services/blogs';

const LoginForm = ({ setUser, makeNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      logger.info('logging in with', username, password);
      const user = await loginService.login({
        username,
        password,
      });
      setUsername('');
      setPassword('');
      setUser(user);
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      makeNotification(`Welcome ${user.name}`, 'green');
    } catch (e) {
      logger.error(e.response.data);
      makeNotification(e.response.data.error, 'red');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} id="loginForm">
        <div>
          {'username '}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          {'password '}
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  makeNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
