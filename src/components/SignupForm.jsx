import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  TextField, Tooltip,
} from '@material-ui/core';

import logger from '../utils/logger';
import { makeNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import { createUser } from '../reducers/userReducer';

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
  const {
    reset: resetUsername,
    ...username
  } = useField('username');
  const {
    reset: resetName,
    ...name
  } = useField('name');
  const {
    reset: resetNewPassword,
    ...newPassword
  } = useField('username', 'password');
  const {
    reset: resetConfirmPassword,
    ...confirmPassword
  } = useField('username', 'password');

  const [validNewPassword, setValidNewPassword] = useState(null);
  const [validConfirmPassword, setValidConfirmPassword] = useState(null);

  const reset = () => {
    resetUsername();
    resetName();
    resetNewPassword();
    resetConfirmPassword();
  };

  const validateNewPassword = () => {
    if (validator.isStrongPassword(newPassword.value)) {
      setValidNewPassword(true);
    } else {
      setValidNewPassword(false);
    }

    if (newPassword.value === confirmPassword.value) {
      setValidConfirmPassword(true);
    } else {
      setValidConfirmPassword(false);
    }
  };

  useEffect(() => {
    validateNewPassword();
  }, [newPassword.value, confirmPassword.value]);

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createUser({
        name: name.value,
        username: username.value,
        password: newPassword.value,
      }));
      reset();
      dispatch(makeNotification({
        message: 'New account created. Login to continue.',
        severity: 'success',
      }));
      browserHistory.push('/login');
    } catch (e) {
      logger.error(e.response.data);
      if (e.response.data.error.includes('User validation failed: username: Error, expected `username` to be unique.')) {
        dispatch(makeNotification({
          message: `Username "${username.value}" already exists. Login or try a different one.`,
          severity: 'error',
        }));

        resetUsername();
        resetNewPassword();
        resetConfirmPassword();
      }
    }
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="CREATE A NEW ACCOUNT TO LOGIN" />
      <form onSubmit={handleSignup} id="loginForm">
        <CardContent>
          <div>
            <TextField
              id="name-input"
              color="primary"
              {...name}
              label="Name"
              required
              margin="normal"
            />
          </div>
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
            <Tooltip
              title="Password should be at least 8 characters long and should contain at least one symbol, lower case alphabet and upper case alphabet"
            >
              <TextField
                id="new-password-input"
                color="primary"
                {...newPassword}
                label="New Password"
                required
                margin="normal"
                error={!validNewPassword && Boolean(newPassword.value)}
                helperText={validNewPassword || !newPassword.value ? null : 'Password is not strong enough.'}
              />
            </Tooltip>
          </div>

          <div>
            <TextField
              id="confirm-password-input"
              label="Confirm Password"
              {...confirmPassword}
              required
              error={
                newPassword.value !== confirmPassword.value
                && (Boolean(newPassword.value) || Boolean(confirmPassword.value))
              }
              helperText={
                newPassword.value !== confirmPassword.value
                && (newPassword.value || confirmPassword.value)
                  ? 'Passwords do not match'
                  : null
              }
            />
          </div>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            id="loginButton"
            type="submit"
            className={classes.login}
            disabled={!validNewPassword || !validConfirmPassword}
          >
            Create Account
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
