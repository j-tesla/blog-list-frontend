import React, { useState } from 'react';
import blogsService from '../services/blogs';

const NewBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();
    const savedBlog = await blogsService.create({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
    setBlogs(blogs.concat(savedBlog));
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
