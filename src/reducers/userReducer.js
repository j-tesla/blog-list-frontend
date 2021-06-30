import usersService from '../services/users';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      return action.data
        .sort((a, b) => (b.blogs.length - a.blogs.length));
    }
    case 'ADD_USER': {
      return [...state, action.data];
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

export const createUser = (user) => async (dispatch) => {
  const data = await usersService.create(user);
  dispatch({
    type: 'ADD_USER',
    data,
  });
};

export default userReducer;
