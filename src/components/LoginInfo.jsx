import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const LoginInfo = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => (state.activeUser));
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(logout());
  };
  return (
    <div>
      {`${activeUser.name} logged in `}
      <button onClick={handleClick} type="button">logout</button>
      <br />
    </div>
  );
};

export default LoginInfo;

LoginInfo.propTypes = {
};
