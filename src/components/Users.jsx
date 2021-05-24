import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from './Blogs';
import { initialiseUsers } from '../reducers/userReducer';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initialiseUsers());
  }, [dispatch]);

  // css
  const paddedDivStyle = {
    paddingTop: 10,
    paddingBottom: 10,
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
              <td>{user.name}</td>
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
