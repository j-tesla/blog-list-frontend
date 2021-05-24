import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';
import { initialiseLogin } from './reducers/loginReducer';
import Users from './components/Users';
import LoginInfo from './components/LoginInfo';

const App = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.activeUser);

  useEffect(() => {
    dispatch(initialiseLogin());
  }, [dispatch]);

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  return (
    <Router>
      <Notifications />
      {
        activeUser === null
          ? (
            <div style={paddedDivStyle}>
              <h2>login to application</h2>
              <LoginForm />
            </div>
          )
          : (
            <div style={paddedDivStyle}>
              <h1>blogs</h1>
              <LoginInfo />
              <Switch>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                  <Blogs />
                </Route>
              </Switch>
            </div>
          )
      }
    </Router>
  );
};

export default App;
