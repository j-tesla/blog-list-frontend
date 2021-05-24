import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import logger from '../utils/logger';
import blogsService from '../services/blogs';
import { makeNotification } from '../reducers/notificationReducer';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
      dispatch(makeNotification({ message: `Welcome ${user.name}`, color: 'green' }));
    } catch (e) {
      setUsername('');
      setPassword('');
      logger.error(e.response.data);
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
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

        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
