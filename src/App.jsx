import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';
import { initialiseLogin } from './reducers/loginReducer';
import Users from './components/Users';
import User from './components/User';
import { initialiseUsers } from './reducers/userReducer';
import Blog from './components/Blog';
import { initialiseBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.activeUser);

  useEffect(async () => {
    await dispatch(initialiseLogin());
    dispatch(initialiseUsers());
    dispatch(initialiseBlogs());
  }, [dispatch]);

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  return (
    <div>
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
              <NavBar />
              <h1>blogs</h1>
              <Switch>
                <Route path="/blogs/:id">
                  <Blog />
                </Route>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/blogs">
                  <Blogs />
                </Route>
                <Route path="/">
                  <Redirect to="/blogs" />
                </Route>
              </Switch>
            </div>
          )
      }
    </div>
  );
};

export default App;
