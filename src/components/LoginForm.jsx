import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logger from '../utils/logger';
import { makeNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      logger.info('logging in with', username, password);
      const user = await dispatch(login({ username, password }));
      setUsername('');
      setPassword('');
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
};

export default LoginForm;
