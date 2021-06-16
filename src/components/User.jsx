import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card, CardContent, CardHeader, List, ListItem, ListItemText, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  boldText: {
    textDecoration: 'bold',
  },
}));

const User = () => {
  const { id } = useParams();
  const classes = useStyles();
  const browserHistory = useHistory();
  const user = useSelector((state) => state.users.find((user) => user.id.toString() === id));

  if (!user) {
    return null;
  }

  const handleBlogClick = ({ id }) => (event) => {
    event.preventDefault();
    browserHistory.push(`/blogs/${id}`);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        title={user.name}
        subheader={user.username}
        titleTypographyProps={{ variant: 'h3' }}
        subheaderTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <Card variant="outlined">
          <CardHeader title="Blogs Added" />
          <CardContent>
            <List>
              {
                user.blogs.map((blog) => (
                  <ListItem alignItems="flex-start" button onClick={handleBlogClick(blog)} key={blog.id}>
                    <ListItemText
                      primary={(
                        <Typography variant="h5">{blog.title}</Typography>
                      )}
                      secondary={` by ${blog.author}`}
                    />
                  </ListItem>
                ))
              }
            </List>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default User;
