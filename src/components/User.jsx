import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((user) => user.id.toString() === id));

  if (!user) {
    return null;
  }

  // css
  const paddedDivStyle = {
    padding: 5,
  };

  return (
    <div style={paddedDivStyle}>
      <h2>{user.name}</h2>
      <h3 style={paddedDivStyle}>added blogs</h3>
      <ul style={paddedDivStyle}>
        {
          user.blogs.map((blog) => (
            <li key={blog.id}>
              <a href={blog.url}>{blog.title}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default User;
