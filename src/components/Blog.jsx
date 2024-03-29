import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  Button,
  Card, CardActions, CardContent, CardHeader, Collapse, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import { Link } from '@material-ui/icons';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import BlogComments from './BlogComments';
import Confirm from './Confirm';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  likeButton: {
    fontSize: theme.typography.fontSize,
    marginRight: theme.spacing(4),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  deleteButton: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(4),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Blog = () => {
  const classes = useStyles();
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const browserHistory = useHistory();
  const { id } = useParams();
  const {
    blog,
    activeUser,
  } = useSelector((state) => ({
    blog: state.blogs.find((blog) => blog.id.toString() === id),
    activeUser: state.activeUser,
  }));
  if (!blog) {
    return null;
  }

  const handleExpandClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog));
    } catch (e) {
      dispatch(makeNotification({
        message: e.response.data.error,
        severity: 'error',
      }));
    }
  };

  const deleteBlog = async () => {
    await dispatch(removeBlog(blog));
    browserHistory.push('/blogs');
  };
  const handleDelete = async () => {
    try {
      setDialog(true);
    } catch (e) {
      if (e.response.status === 403) {
        dispatch(makeNotification({
          message: 'not your blog to delete, mate!',
          severity: 'error',
        }));
      }
    }
  };

  return (
    <>
      {dialog
      && (
        <Confirm
          confirm={deleteBlog}
          cancel={() => {
            setDialog(false);
          }}
          message={`Delete blog '${blog.title}' by ${blog.author}?`}
        />
      )}
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          title={blog.title}
          subheader={` by ${blog.author}`}
          titleTypographyProps={{ variant: 'h3' }}
          subheaderTypographyProps={{ variant: 'h5' }}
          action={(
            <IconButton color="inherit" href={blog.url}>
              <Link href={blog.url} />
            </IconButton>
          )}
        />
        <CardContent>
          <Typography variant="h6">{`added by ${blog.user.name}`}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            className={classes.likeButton}
            onClick={handleLike}
            color="secondary"
            startIcon={<ThumbUpIcon />}
          >
            <span>{`Likes: ${blog.likes}`}</span>
          </Button>
          {activeUser.id === blog.user.id && (
            <IconButton onClick={handleDelete} className={classes.deleteButton}>
              <DeleteIcon />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            className={clsx(classes.expand, {
              [classes.expandOpen]: commentsExpanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={commentsExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
          <BlogComments blog={blog} />
        </Collapse>
      </Card>
    </>
  );
};

Blog.propTypes = {
};

export default Blog;
