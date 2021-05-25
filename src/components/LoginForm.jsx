import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logger from '../utils/logger';
import { makeNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/loginReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  const { reset: resetUsername, ...username } = useField('username');
  const { reset: resetPassword, ...password } = useField('username', 'password');

  const reset = () => {
    resetUsername();
    resetPassword();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      logger.info('logging in with', username, password);
      const user = await dispatch(login({ username: username.value, password: password.value }));
      reset();
      dispatch(makeNotification({ message: `Welcome ${user.name}`, color: 'green' }));
      browserHistory.push('/');
    } catch (e) {
      reset();
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
            {...username}
          />
        </div>

        <div>
          {'password '}
          <input
            id="password"
            {...password}
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
