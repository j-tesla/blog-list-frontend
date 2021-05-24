import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  const style = {
    color: message.color,
    backgroundColor: '#DCDCDC',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: message.color,
    padding: 10,
    marginBottom: 5,
  };

  return (
    <div style={style}>{message.message}</div>
  );
};

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      {notifications.map((notification) => (
        <Notification message={notification} key={notification.id} />
      ))}
    </>
  );
};
export default Notifications;

Notification.propTypes = {
  message: PropTypes.shape({
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.number,
  }).isRequired,
};

Notifications.propTypes = {
};
