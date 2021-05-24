import blogsService from '../services/blogs';
import loginService from '../services/login';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_USER': {
      return action.data;
    }
    case 'REMOVE_ACTIVE_USER': {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const initialiseLogin = () => async (dispatch) => {
  const userJSON = window.localStorage.getItem('bloglistUser');
  if (userJSON) {
    const userObj = JSON.parse(userJSON);
    blogsService.setToken(userObj.token);
    dispatch({
      type: 'SET_ACTIVE_USER',
      data: userObj,
    });
  }
};

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem('bloglistUser');
  dispatch({
    type: 'REMOVE_ACTIVE_USER',
  });
  blogsService.setToken(null);
};

export const login = ({ username, password }) => async (dispatch) => {
  const user = await loginService.login({
    username,
    password,
  });
  dispatch({
    type: 'SET_ACTIVE_USER',
    data: user,
  });
  window.localStorage.setItem('bloglistUser', JSON.stringify(user));
  blogsService.setToken(user.token);

  return user;
};

export default loginReducer;
