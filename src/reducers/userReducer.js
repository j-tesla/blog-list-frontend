import usersService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      return action.data
        .sort((a, b) => (b.blogs.length - a.blogs.length));
    }
    default: {
      return state;
    }
  }
};

export const initialiseUsers = () => async (dispatch) => {
  const data = await usersService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data,
  });
};

export default userReducer;
