import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  Button, TextField, Card, CardHeader, CardContent, CardActions,
} from '@material-ui/core';
import { makeNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(4),
//       width: '25ch',
//     },
//   },
// }));

const NewBlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const {
    reset: resetTitle,
    ...title
  } = useField('title');
  const {
    reset: resetAuthor,
    ...author
  } = useField('title');
  const {
    reset: resetUrl,
    ...url
  } = useField('title', 'url');

  const reset = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      }));
      reset();
      toggleVisibility();
      dispatch(makeNotification({ message: `a new blog: ${title.value} by ${author.value}`, color: 'green' }));
    } catch (e) {
      dispatch(makeNotification({ message: e.response.data.error, color: 'red' }));
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title="CREATE NEW" />
      <form onSubmit={addNewBlog}>
        <CardContent>
          <div>
            <TextField
              id="title-input"
              color="primary"
              {...title}
              label="title"
              required
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="author-input"
              color="primary"
              {...author}
              label="author"
              required
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="url-input"
              color="primary"
              {...url}
              label="url"
              required
              margin="normal"
            />
          </div>
        </CardContent>
        <CardActions>
          <Button color="primary" type="submit">create</Button>
          <Button color="default" type="button" onClick={toggleVisibility}>cancel</Button>
        </CardActions>
      </form>
    </Card>
  );
};

NewBlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default NewBlogForm;
