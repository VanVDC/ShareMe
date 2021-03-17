import { combineReducers } from 'redux';
import { userLoginReducer, userAddReducer } from './userReducers';
import { getCurrentProfileReducer } from './profileReducers';
import post from './postReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userAdd: userAddReducer,
  profile: getCurrentProfileReducer,
  post,
});
