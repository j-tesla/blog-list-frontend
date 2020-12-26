import React, { useRef } from 'react';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blog = ({
  blog, makeNotification, likeBlog, removeBlog, owned,
}) => {
  // css
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // ref to Toggleable
  const blogRef = useRef();
  const toggleVisibility = () => {
    blogRef.current.toggleVisibility();
  };

  const handleLike = async () => {
    try {
      await blogsService.update(blog.id, { likes: blog.likes + 1 });
      likeBlog(blog.id);
    } catch (e) {
      makeNotification(e.response.data.error, 'red');
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) await blogsService.delete(blog.id);
      removeBlog(blog.id);
    } catch (e) {
      if (e.response.status === 403) makeNotification('not your blog to delete, mate!', 'red');
    }
  };

  return (
    <div style={blogStyle}>
      {`${blog.title} -${blog.author}`}
      <Toggleable buttonLabel="view" cancelButton={false} ref={blogRef}>
        <button type="button" onClick={toggleVisibility}>hide</button>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {`likes: ${blog.likes} `}
          <button type="button" onClick={handleLike}>like</button>
          <br />
          {`added by ${blog.user.name}`}
          <br />
          {owned && (<button type="button" onClick={handleDelete}>delete</button>)}
        </div>
      </Toggleable>
    </div>
  );
};

export default Blog;
