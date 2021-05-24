import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Blogs from './Blogs';

const Users = () => {
  const users = useSelector((state) => state.users);

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
  };
  const padding = {
    padding: 5,
  };
  const tableStyle = {
    padding: 10,
    border: '1px solid black',
    borderSpacing: 3,
    width: '100%',
  };
  const tableHeaderStyle = {
    textAlign: 'left',
  };
  return (
    <div style={paddedDivStyle}>
      <h2 style={paddedDivStyle}>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}> </th>
            <th style={tableHeaderStyle}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link style={padding} to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Blogs.propTypes = {};

export default Users;
