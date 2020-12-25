import React, { useState } from 'react';
import blogsService from '../services/blogs';

const NewBlogForm = ({ blogs, setBlogs, makeNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    try {
      const savedBlog = await blogsService.create({
        title,
        author,
        url,
      });
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(savedBlog));
      makeNotification(`a new blog: ${savedBlog.title} by ${savedBlog.author}`, 'green');
    } catch (e) {
      makeNotification(e.response.data.error, 'red');
    }
  };

  return (
    <form onSubmit={addNewBlog}>
      <div>
        {'title: '}
        <input value={title} onChange={handleChange(setTitle)} />
      </div>
      <div>
        {'author: '}
        <input value={author} onChange={handleChange(setAuthor)} />
      </div>
      <div>
        {'url: '}
        <input value={url} onChange={handleChange(setUrl)} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default NewBlogForm;
