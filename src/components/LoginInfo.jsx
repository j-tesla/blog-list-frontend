import React from 'react';

const LoginInfo = ({ user, setUser }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('bloglistUser');
    setUser(null);
  };
  return (
    <div>
      {`${user.name} logged in `}
      <button onClick={handleClick} type="button">logout</button>
      <br />
    </div>
  );
};

export default LoginInfo;
