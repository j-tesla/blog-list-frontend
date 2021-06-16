import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div>
      {Boolean(notification) && (
        <Snackbar open={Boolean(notification)}>
          <Alert severity={notification.severity}>{notification.message}</Alert>
        </Snackbar>
      )}

    </div>
  );
};
export default Notification;

Notification.propTypes = {
};
