import { combineReducers } from 'redux';
import { userLoginReducer, userAddReducer } from './userReducers';
import profile from './profileReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userAdd: userAddReducer,
  profile,
});
