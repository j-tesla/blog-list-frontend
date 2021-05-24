import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';
import { initialiseLogin } from './reducers/loginReducer';

const App = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.activeUser);

  useEffect(() => {
    dispatch(initialiseLogin());
  }, [dispatch]);

  return (
    <div>
      {
        activeUser === null
          ? (<h2>login to application</h2>)
          : (<h2>blogs</h2>)
      }
      <Notifications />
      {
        activeUser === null
          ? (<LoginForm />)
          : (<Blogs />)
      }
    </div>
  );
};

export default App;
