import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, ListItemText, makeStyles, Paper, Tooltip, Typography, useTheme, Zoom,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';

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
  newBlogIcon: {
    fontSize: theme.typography.fontSize * 3,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  zoom: {
    transitionDelay: theme.transitions.duration.leavingScreen,
  },
}));

const Blogs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const browserHistory = useHistory();
  const { blogs } = useSelector((state) => (state));

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // ref to Toggleable
  const newBlogRef = useRef(null);
  const toggleVisibility = () => {
    newBlogRef.current.toggleVisibility();
  };

  const handleBlogClick = ({ id }) => (event) => {
    event.preventDefault();
    browserHistory.push(`/blogs/${id}`);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>Blogs</Typography>

      <Toggleable
        button={(
          <Zoom
            unmountOnExit
            timeout={transitionDuration}
            className={classes.zoom}
            in
          >
            <Tooltip title="Add New Blog" aria-label="Add New Blog">
              <Fab color="primary" size="large" className={classes.fab} onClick={toggleVisibility}>
                <AddIcon color="inherit" />
              </Fab>
            </Tooltip>
          </Zoom>
        )}
        ref={newBlogRef}
      >
        <NewBlogForm
          toggleVisibility={toggleVisibility}
        />
      </Toggleable>
      {/* </div> */}

      <Paper variant="outlined">
        <List>
          {blogs.map((blog) => (
            <ListItem alignItems="flex-start" key={blog.id} button onClick={handleBlogClick(blog)}>
              <ListItemText
                primary={(
                  <Typography variant="h5">{blog.title}</Typography>
                )}
                secondary={` by ${blog.author}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

Blogs.propTypes = {
};

export default Blogs;
