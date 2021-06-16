import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  activeUser: loginReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
