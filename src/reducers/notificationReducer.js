const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const makeNotification = (notification, tInSec = 5) => async (dispatch) => {
  dispatch({
    type: 'NEW_NOTIFICATION',
    data: notification,
  });

  setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
  }, tInSec * 1000);
};

export default notificationReducer;
