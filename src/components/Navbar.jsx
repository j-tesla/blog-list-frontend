import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { logout } from '../reducers/loginReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
  navLink: {
    textDecoration: 'none currentcolor solid',
  },
  activeNavLink: {
    '& $navBtn': {
      color: theme.palette.secondary.light,
      border: 2,
    },
  },
  navBtn: {
    color: theme.palette.secondary.contrastText,
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => (state.activeUser));
  const browserHistory = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    dispatch(logout());
  };

  const handleAccount = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    browserHistory.push(`/users/${activeUser.id}`);
  };
  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h5" color="inherit" className={classes.title}>
            Bloglist
          </Typography>
          <NavLink
            className={classes.navLink}
            activeClassName={clsx([classes.navLink, classes.activeNavLink])}
            exact
            to="/blogs"
          >
            <Button variant="text" className={classes.navBtn}>blogs</Button>
          </NavLink>
          <NavLink
            className={classes.navLink}
            activeClassName={clsx([classes.navLink, classes.activeNavLink])}
            exact
            to="/users"
          >
            <Button variant="text" className={classes.navBtn}>users</Button>
          </NavLink>
          <IconButton
            aria-label="current user's account"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleAccount}>Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

NavBar.propTypes = {};
