import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card, CardActions, CardContent, CardHeader, makeStyles, TextField,
} from '@material-ui/core';

import logger from '../utils/logger';
import { makeNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/loginReducer';
import { useField } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  login: {
    marginLeft: theme.spacing(1),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
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
      const user = await dispatch(login({ username: username.value, password: password.value }));
      reset();
      dispatch(makeNotification({ message: `Welcome ${user.name}`, severity: 'success' }));
      browserHistory.push('/');
    } catch (e) {
      reset();
      logger.error(e.response.data);
      dispatch(makeNotification({ message: e.response.data.error, severity: 'error' }));
    }
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="LOGIN TO THE APPLICATION" />
      <form onSubmit={handleLogin} id="loginForm">
        <CardContent>
          <div>
            <TextField
              id="username-input"
              color="primary"
              {...username}
              label="Username"
              required
              margin="normal"
            />
          </div>

          <div>
            <TextField
              id="password-input"
              color="primary"
              {...password}
              label="Password"
              required
              margin="normal"
            />
          </div>
        </CardContent>

        <CardActions>
          <Button variant="contained" color="primary" id="loginButton" type="submit" className={classes.login}>
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

LoginForm.propTypes = {
};

export default LoginForm;
