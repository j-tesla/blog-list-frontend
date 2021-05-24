import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';

const NavBar = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => (state.activeUser));

  // css
  const padding = {
    display: 'inline',
    padding: 5,
  };
  const navLinkActiveStyle = {
    padding: 5,
    color: '#C93A61',
    fontWeight: 'bold',
  };
  const navStyle = {
    background: '#EDE9e8',
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <nav style={navStyle}>
      <NavLink style={padding} activeStyle={navLinkActiveStyle} exact to="/blogs">blogs</NavLink>
      <NavLink style={padding} activeStyle={navLinkActiveStyle} exact to="/users">users</NavLink>
      <div style={padding}>
        {activeUser
          ? (
            <>
              {`${activeUser.name} logged in `}
              <button onClick={handleLogout} type="button">logout</button>
            </>
          )
          : null}
      </div>

    </nav>
  );
};

export default NavBar;

NavBar.propTypes = {};
