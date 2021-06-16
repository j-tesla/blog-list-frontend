import React from 'react';
import { useDispatch } from 'react-redux';
import {
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Comment } from '@material-ui/icons';

import { makeNotification } from '../reducers/notificationReducer';
import { commentBlog } from '../reducers/blogReducer';
import customPropTypes from '../utils/customPropTypes';
import { useField } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  actions: {
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
}));
const BlogComments = ({ blog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField('comment');

  const addComment = async (event) => {
    event.preventDefault();

    try {
      await dispatch(commentBlog(blog, comment.value));
      resetComment();
      dispatch(makeNotification({ message: `commented on blog: "${blog.title}"`, color: 'green' }));
    } catch (e) {
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
    }
  };

  return (
    <div className={classes.root}>
      <CardHeader title="Comments" />
      <form onSubmit={addComment}>
        <CardContent>
          <List>
            {
              Array.from(blog.comments.entries(), ([index, blog]) => (
                <ListItem key={index.toString() + blog}><ListItemText primary={blog} /></ListItem>
              ))
            }
          </List>
        </CardContent>
        <CardActions className={classes.actions}>
          <TextField id="comment-input" color="primary" {...comment} margin="normal" size="small" />
          <IconButton color="inherit" type="submit"><Comment /></IconButton>
        </CardActions>
      </form>
    </div>
  );
};

BlogComments.propTypes = {
  blog: customPropTypes.blog.isRequired,
};

export default BlogComments;
