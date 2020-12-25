import React from 'react';

const Notification = ({ message }) => {
  const greenMessageStyle = {
    color: message.color,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: message.color,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <h2 style={greenMessageStyle}>{message.message}</h2>
  );
};

export default Notification;
