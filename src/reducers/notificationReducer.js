const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return [action.data, ...state];
    case 'REMOVE_NOTIFICATION':
      return state.filter((n) => (n.id !== action.data.id));
    default:
      return state;
  }
};
const generateId = () => Math.floor(Math.random() * 1000000);

export const makeNotification = (notification, tInSec = 5) => async (dispatch) => {
  const id = generateId();
  dispatch({
    type: 'NEW_NOTIFICATION',
    data: { ...notification, id },
  });

  setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      data: { id },
    });
  }, tInSec * 1000);
};

export default notificationReducer;
