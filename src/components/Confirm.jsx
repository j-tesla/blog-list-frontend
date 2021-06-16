import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: theme.palette.warning.light,
  },
}));

const Confirm = ({ message, confirm, cancel }) => {
  const classes = useStyles();
  const handleConfirm = (event) => {
    event.preventDefault();
    confirm();
  };
  const handleCancel = (event) => {
    event.preventDefault();
    cancel();
  };

  return (
    <Dialog open>
      <DialogTitle id="confirm-dialog">
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirm} className={classes.confirm}>Confirm</Button>
        <Button color="inherit" onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

Confirm.propTypes = {
  message: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Confirm;
