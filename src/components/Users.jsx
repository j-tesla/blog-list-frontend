import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  List, ListItem, ListItemText, makeStyles, Typography,
} from '@material-ui/core';
import Blogs from './Blogs';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  title: {
    flexGrow: 1,
  },
  inline: {
    display: 'inline',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Users = () => {
  const browserHistory = useHistory();
  const classes = useStyles();
  const users = useSelector((state) => state.users);

  const handleUserClick = ({ id }) => (event) => {
    event.preventDefault();
    browserHistory.push(`/users/${id}`);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>Users</Typography>

      <List className={classes.list}>
        {users.map(((user) => (
          <ListItem alignItems="flex-start" key={user.id} button onClick={handleUserClick(user)}>
            <ListItemText
              primary={(
                <Typography
                  variant="h5"
                  to={`/users/${user.id}`}
                >
                  {`${user.username}`}
                </Typography>
              )}
              secondary={(
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {user.name}
                  </Typography>
                  {` added ${user.blogs.length} blogs`}
                </>
              )}
            />
          </ListItem>
        )))}
      </List>
    </div>
  );
};

Blogs.propTypes = {};

export default Users;
