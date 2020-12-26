import React, { useState, useRef } from 'react';
import Toggleable from './Toggleable';
import blogsService from '../services/blogs';

const Blog = ({ blog, makeNotification }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [likes, setLikes] = useState(blog.likes);

  // ref to Toggleable
  const blogRef = useRef();
  const toggleVisibility = () => {
    blogRef.current.toggleVisibility();
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogsService.update(blog.id, { likes: likes + 1 });
      setLikes(updatedBlog.likes);
    } catch (e) {
      makeNotification(e.response.data.error, 'red');
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
          {`likes: ${likes} `}
          <button type="button" onClick={handleLike}>like</button>
          <br />
          {`added by ${blog.user.name}`}
        </div>
      </Toggleable>
    </div>
  );
};

export default Blog;
